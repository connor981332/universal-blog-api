import { insertOne, getPaginatedDocuments, getAggregation } from './database';
import Post from '../models/post';

const collectionName = 'posts';

export const addPost = async (post: Post) => {
    await insertOne(collectionName, post);
}

export const getPostsByCategory = async (category: string, pageNumber: number, pageSize: number) => {
    return await getPaginatedDocuments(collectionName, { category: category }, { createdAt: -1 }, pageNumber, pageSize);
}

export const getRecentPosts = async (pageNumber: number, pageSize: number) => {
    return await getPaginatedDocuments(collectionName, {}, { createdAt: -1 }, pageNumber, pageSize);
}

export const getCategories = async () => {
    const pipeline = [
        {
            $group: {
                _id: '$category',
                count: { $sum: 1 }
            }
        },
        {
            $sort: { count: -1 }
        }
    ];
    return await getAggregation(collectionName, pipeline);
}
