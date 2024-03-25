import express from 'express';
const router = express.Router();
import { sendResponse } from '../middleware/shared';
import { jsonToPost, verifyPageQueries, addPostToDatabase, getRecentPosts, getCategories } from '../middleware/post';

router.post('/',
    jsonToPost,
    addPostToDatabase,
    sendResponse
)

router.get('/recents',
    verifyPageQueries,
    getRecentPosts,
    sendResponse
)

router.get('/categories',
    verifyPageQueries,
    getCategories,
    sendResponse
)

export default router;