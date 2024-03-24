import { insertOne } from './database';
import Post from '../models/post';

const collectionName = 'posts';

export const addPost = async (post: Post) => {
    await insertOne(collectionName, post);
}
