import express from 'express';

import Category from '../models/Category';

const router = express.Router();

router.route('/')
	.get(async (req, res) => {
		const result = await Category.find({}).exec();
		return res.json({ success: true, result });
	});

router.route('/name/:name')
	.get(async (req, res) => {
		const category = await Category.findOne({ name: req.params.name })
			.exec();
		return res.json({ success: true, result: category });
	});

export default router;
