import express from 'express';
const router = express.Router();
import { sendResponse } from '../middleware/shared';
import { jsonToPost, addPostToDatabase, getRecentPosts, getCategories } from '../middleware/post';

router.post('/',
    jsonToPost,
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