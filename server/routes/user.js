import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';

import User from '../models/User';
import { isLoggedIn } from '../helpers/middleware';
import { encrypt, decrypt, hashPassword, truncateEncrypted } from '../helpers/encryption';

const UPLOAD_FOLDER = `${__dirname}/../../uploads`;

const router = express.Router();

router.use((req, res, next) => isLoggedIn(req, res, next));

router.route('/me')
	.get(async (req, res) => {
		const { _id, username, email, fullName, avatar, role } = req.user;
		return res.json({ success: true, result: { username, email, fullName, avatar, role } });
	});

export default router;
