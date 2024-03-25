import express from 'express';
const router = express.Router();
import { sendResponse } from '../middleware/shared';
import { getCategories } from '../middleware/post';

router.get('/',
    getCategories,
    sendResponse
)

export default router;