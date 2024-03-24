import {Request, Response, NextFunction} from 'express';
import Post from '../models/post';
import HttpError from '../utils/HttpError';
import ExpressAsyncHandler from '../utils/ExpressAsyncHandler';
import { addPost } from '../data-access/postDAO';

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

export const addPostToDatabase = ExpressAsyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    try {
        await addPost(res.locals.post);
        res.locals.response = {'message': 'Post successfuly added'};
        next();
    } catch (err: any) {
        next(new HttpError(err.message, 500));
    }
});

export const getRecentPosts = (req: Request, res: Response, next: NextFunction) => {
    res.locals.response = {'message': 'There are no posts yet'}
    next();
}

export const getCategories = (req: Request, res: Response, next: NextFunction) => {
    res.locals.response = {'message': 'There are no categories yet'}
    next();
}