import { insertOne, getPaginatedDocuments } from './database';
import Post from '../models/post';

const collectionName = 'posts';

export const addPost = async (post: Post) => {
    await insertOne(collectionName, post);
}

export const getPostsByCategory = async (category: string, pageNumber: number, pageSize: number) => {
    return await getPaginatedDocuments(collectionName, { category: category }, { createdAt: -1 }, pageNumber, pageSize);
}

export const getRecentPosts = async (pageNumber: number, pageSize: number) => {
    console.log('Getting recent posts...');
    const results = await getPaginatedDocuments(collectionName, {}, { createdAt: -1 }, pageNumber, pageSize);
    console.log('Done. The results are: ', results);
    return results;
}
