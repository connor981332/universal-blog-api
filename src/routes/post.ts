import express from 'express';
const router = express.Router();
import { sendResponse } from '../middleware/shared';
import { jsonToPost, addPostToDatabase } from '../middleware/post';

router.post('/',
    jsonToPost,
    addPostToDatabase,
    sendResponse
)

export default router;