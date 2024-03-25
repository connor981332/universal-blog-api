import {Request, Response, NextFunction} from 'express';
import Post from '../models/post';
import HttpError from '../utils/HttpError';
import ExpressAsyncHandler from '../utils/ExpressAsyncHandler';
import { addPost, getRecentPosts as getRecentPostsFromDb, getPostsByCategory, getCategories as getCategoriesFromDb } from '../data-access/postDAO';

export const jsonToPost = (req: Request, res: Response, next: NextFunction) => {
    let post;
    try {
        post = Post.fromJson(req.body);
        res.locals.post = post;
        next();
    } catch (err: any) {
        next(new HttpError(err.message, 400));
    }
}

export const verifyPageQueries = (req: Request, res: Response, next: NextFunction) => {
    const pageNumber = parseInt(req.query.pageNumber as string);
    const pageSize = parseInt(req.query.pageSize as string);
    if (isNaN(pageNumber) || pageNumber <= 0) return next(new HttpError('pageNumber is a required query and must be a positive integer', 400));
    if (isNaN(pageSize) || pageSize <= 0) return next(new HttpError('pageSize is a required query and must be a positive integer', 400));
    res.locals.pageNumber = pageNumber;
    res.locals.pageSize = pageSize;
    return next();
}

export const addPostToDatabase = ExpressAsyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    try {
        await addPost(res.locals.post);
        res.locals.response = {'message': 'Post successfuly added'};
        next();
    } catch (err: any) {
        next(new HttpError(err.message, 500));
    }
});

export const getRecentPosts = ExpressAsyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    try {
        const results = await getRecentPostsFromDb(res.locals.pageNumber, res.locals.pageSize);
        res.locals.response = {
            posts: results.results,
            totalPosts: results.totalDocuments
        };
        next();
    } catch (err: any) {
        next(new HttpError(err.message, 500));
    }
});

export const getCategories = ExpressAsyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    let categories = await getCategoriesFromDb();
    categories = categories.map((category:any) => {
        return {
            name: category._id,
            count: category.count
        }
    });
    res.locals.response = { 'categories': categories };
    next();
});

export const getRecentPostsByCategory = ExpressAsyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    try {
        const results = await getPostsByCategory(req.params.category, res.locals.pageNumber, res.locals.pageSize);
        res.locals.response = {
            posts: results.results,
            totalPosts: results.totalDocuments
        };
        next();
    } catch (err: any) {
        next(new HttpError(err.message, 500));
    }
});