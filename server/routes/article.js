import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import bluebird from 'bluebird';
import fs from 'fs';
import mkdirp from 'mkdirp';

import Article from '../models/Article'
import Tag from '../models/Tag';
import Category from '../models/Category';
import Comment from '../models/Comment';
import User from '../models/User';
import { encrypt, decrypt, truncateEncrypted, hashPassword, generateSalt } from '../helpers/encryption';
import { encryptId, isLoggedIn } from '../helpers/middleware';

const UPLOAD_FOLDER = `${__dirname}/../../uploads`;

const router = express.Router();

router.route('/')
	.post(
		(req, res, next) => isLoggedIn(req, res, next),
		multer({
			storage: multer.diskStorage({
				destination: path.resolve(UPLOAD_FOLDER, 'img/tmp'),
				filename: (req, file, callback) => {
					const imageId = mongoose.Types.ObjectId();
					const filename = file.originalname;
					const ext = filename.split('.').pop();
					return callback(null, `${imageId}.${ext}`);
				}
			})
		}).single('file'),
		async (req, res) => {
			const { title, content, categoryId, tags } = req.body;
			const id = mongoose.Types.ObjectId();
			const encryptedId = truncateEncrypted(encrypt(id.toString()));

			// UPLOAD COVER IMAGE

			const filename = req.file.filename;
			const ext = filename.split('.').pop();
			const encrypted_filename = truncateEncrypted(encrypt(filename + Date.now().toString())) + '.' + ext;

			const oldpath = path.resolve(UPLOAD_FOLDER, 'img/tmp', req.file.filename);
			const newpath = path.resolve(UPLOAD_FOLDER, `img/articles/${encryptedId}/cover/${encrypted_filename}`);

			mkdirp.sync(path.resolve(UPLOAD_FOLDER, `img/articles/${encryptedId}/cover`));
			fs.renameSync(oldpath, newpath);

			const fields = {
				_id: id,
				title,
				content,
				coverImg: `/uploads/img/articles/${encryptedId}/cover/${encrypted_filename}`,
				categoryId,
				authorId: req.user._id
			};
			let article = new Article(fields);
			await article.save();
			let newTags = [];

			// HANDLE TAGS

			await bluebird.map(JSON.parse(tags), async (tag) => {
				const newTag = await Tag.findOneAndUpdate({ tagValue: tag }, { $addToSet: { articles: article._id } }, { upsert: true, new: true });
				newTags.push(newTag);
			});
			article = await Article.findByIdAndUpdate(article._id, { tags: newTags.map((item) => (item._id)) }, { new: true });

			return res.json({ success: true, result: article });
		})
	.get(async (req, res) => {
		const page = req.query.page ? Number(req.query.page) : 1;
		const limit = req.query.limit ? Number(req.query.limit) : 5;
		let filter_options = Object.assign({});
		if (req.query.categoryId) {
			filter_options.categoryId = req.query.categoryId
		}
		const result = await Article.find(filter_options).sort({ createdAt: -1 })
			.skip((page - 1) * limit).limit(limit)
			.populate({ path: 'categoryId', select: ['name', 'displayName'] })
			.exec();
		const count = await Article.countDocuments({});
		return res.json({ success: true, result, count });
	});

router.route('/title/:title')
	.get(async (req, res) => {
		const article = await Article.findOne({ title: req.params.title })
			.populate({ path: 'tags', select: 'tagValue' })
			.populate({ path: 'authorId', select: ['fullName', 'avatar'] })
			.populate({ path: 'categoryId', select: ['name', 'displayName'] })
			.exec();
		return res.json({ success: true, result: article });
	});

router.route('/title/:title/comments')
	.get(async (req, res) => {
		const article = await Article.findOne({ title: decodeURIComponent(req.params.title) });
		let commentThreads = await Comment.find({ articleId: article._id, parentCommentId: null }).sort({ createdAt: -1 })
			.populate({ path: 'commenterId', select: ['fullName', 'avatar'] })
			.lean()
			.exec();
		for (let thread of commentThreads) {
			let subcomments = await Comment.find({ articleId: article._id, parentCommentId: thread._id }).sort({ createdAt: 1 })
				.populate({ path: 'commenterId', select: ['fullName', 'avatar'] })
				.exec();
			thread.subcomments = subcomments;
		}
		const count = await Comment.countDocuments({ articleId: article._id });
		return res.json({ success: true, result: commentThreads, count });
	})
	.post(async (req, res) => {
		const article = await Article.findOne({ title: req.params.title });
		const { text, parentCommentId } = req.body;
		let newCommentData = { text, articleId: article._id, parentCommentId };
		let commenter = Object.assign({});
		if (req.isAuthenticated()) {
			newCommentData.commenterId = req.user._id;
			commenter = {
				fullName: req.user.fullName,
				avatar: req.user.avatar
			};
		} else {
			const { fullName, email, password } = req.body;
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				if (existingUser.fullName != fullName) {
					return res.status(401).json({ success: false, error: 'Your name and email do not match!' });
				} else if (existingUser.password != hashPassword(password, existingUser.salt)) {
					return res.status(401).json({ success: false, error: 'Wrong password!' });
				}
				newCommentData.commenterId = existingUser._id;
				commenter = {
					fullName: existingUser.fullName
				};
			} else {
				const salt = generateSalt();
				const newUserData = {
					username: email,
					email,
					fullName,
					salt,
					password: hashPassword(password, salt)
				};
				let newUser = new User(newUserData);
				await newUser.save();
				newCommentData.commenterId = newUser._id;
				commenter = { fullName };
			}
		}
		let newComment = new Comment(newCommentData);
		newComment.save();
		return res.json({ success: true, result: { ...newComment._doc, commenterId: commenter } });
	});

router.route('/category/:category')
	.get(async (req, res) => {
		const page = req.query.page ? Number(req.query.page) : 1;
		const limit = req.query.limit ? Number(req.query.limit) : 5;
		const category = await Category.findOne({ name: req.params.category });
		const result = await Article.find({ categoryId: category._id }).sort({ createdAt: -1 })
			.skip((page - 1) * limit).limit(limit)
			.exec();
		const count = await Article.countDocuments({ categoryId: category._id });
		return res.json({ success: true, result, count });
	});

router.route('/tag/:tag')
	.get(async (req, res) => {
		const page = req.query.page ? Number(req.query.page) : 1;
		const limit = req.query.limit ? Number(req.query.limit) : 5;
		const tag = await Tag.findOne({ tagValue: req.params.tag });
		const result = await Article.find({ tags: { $in: [tag._id] } }).sort({ createdAt: -1 })
			.skip((page - 1) * limit).limit(limit)
			.populate({ path: 'categoryId', select: ['name', 'displayName'] })
			.exec();
		const count = await Article.countDocuments({ tags: { $in: [tag._id] } });
		return res.json({ success: true, result, count });
	});

router.route('/search')
	.get(async (req, res) => {
		const page = req.query.page ? Number(req.query.page) : 1;
		const limit = req.query.limit ? Number(req.query.limit) : 5;
		let filterOptions = Object.assign({});
		if (req.query.keyword) {
			const keyword = req.query.keyword || '';
			const regexFilter = { $regex: new RegExp(keyword, 'gi') };
			filterOptions['$or'] = [{ title: regexFilter }, { content: regexFilter }];
		}
		const result = await Article.find(filterOptions)
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit).limit(limit)
			.populate({ path: 'categoryId', select: ['name', 'displayName'] })
			.exec();
		const count = await Article.countDocuments(filterOptions);
		return res.json({ success: true, result, count });
	});


router.route('/:id')
	.get(
		// (req, res, next) => encryptId(req, res, next),
		async (req, res) => {
			const article = await Article.findOne({ _id: req.params.id }).populate({ path: 'tags', select: 'tagValue' }).exec();
			return res.json({ success: true, result: article });
		})
	.put(
		(req, res, next) => isLoggedIn(req, res, next),
		multer({
			storage: multer.diskStorage({
				destination: path.resolve(UPLOAD_FOLDER, 'img/tmp'),
				filename: (req, file, callback) => {
					const imageId = mongoose.Types.ObjectId();
					const filename = file.originalname;
					const ext = filename.split('.').pop();
					return callback(null, `${imageId}.${ext}`);
				}
			})
		}).single('file'),
		async (req, res) => {
			const tags = !Array.isArray(req.body.tags) ? JSON.parse(req.body.tags) : req.body.tags;
			// const objectId = decrypt(req.params.id);
			const objectId = req.params.id;
			let article = await Article.findOne({ _id: objectId }).populate({ path: 'tags', select: 'tagValue' }).exec();
			// HANDLE TAGS
			const removeTags = article.tags.filter((tag) => !tags.includes(tag.tagValue));
			const conditions = { tagValue: { $in: removeTags.map((tag) => (tag.tagValue)) } };
			const options = { $pull: { articles: { $in: [mongoose.Types.ObjectId(objectId)] } } };
			const removed = await Tag.updateMany(conditions, options);
			// console.log(removed);
			let addTags = [];
			await bluebird.map(tags, async (tag) => {
				const newTag = await Tag.findOneAndUpdate({ tagValue: tag }, { $addToSet: { articles: objectId } }, { upsert: true, new: true });
				addTags.push(newTag);
			});

			let data = { ...req.body, tags: addTags.map((item) => (item._id)) };
			// UPLOAD COVER IMAGE
			if (req.file) {
				const encryptedId = truncateEncrypted(encrypt(objectId));
				const filename = req.file.filename;
				const ext = filename.split('.').pop();
				const encrypted_filename = truncateEncrypted(encrypt(filename + Date.now().toString())) + '.' + ext;

				const oldpath = path.resolve(UPLOAD_FOLDER, 'img/tmp', req.file.filename);
				const newpath = path.resolve(UPLOAD_FOLDER, `img/articles/${encryptedId}/cover/${encrypted_filename}`);

				mkdirp.sync(path.resolve(UPLOAD_FOLDER, `img/articles/${encryptedId}/cover`));
				fs.renameSync(oldpath, newpath);

				data.coverImg = `/uploads/img/articles/${encryptedId}/cover/${encrypted_filename}`;
			}

			article = await Article.findByIdAndUpdate(article._id, data, { new: true })
				.populate({ path: 'tags', select: 'tagValue' })
				.populate({ path: 'categoryId', select: 'displayName' })

			return res.json({ success: true, result: article });
		})
	.delete(async (req, res) => {
		// const objectId = decrypt(req.params.id);
	});

export default router;
