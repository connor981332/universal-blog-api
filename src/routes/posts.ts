import express from 'express';
const router = express.Router();
import { sendResponse } from '../middleware/shared';
import { verifyPageQueries, getRecentPosts, getRecentPostsByCategory } from '../middleware/post';

router.get('/recent',
    verifyPageQueries,
    getRecentPosts,
    sendResponse
)

router.get('/category/:category',
    verifyPageQueries,
    getRecentPostsByCategory,
    sendResponse
)

export default router;