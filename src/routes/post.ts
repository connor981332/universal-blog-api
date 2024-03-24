import express from 'express';
const router = express.Router();
import { sendResponse } from '../middleware/shared';
import { addPostToDatabase, getRecentPosts, getCategories } from '../middleware/post';

router.post('/',
    addPostToDatabase,
    sendResponse
)

router.get('/recents',
    getRecentPosts,
    sendResponse
)

router.get('/categories',
    getCategories,
    sendResponse
)

export default router;