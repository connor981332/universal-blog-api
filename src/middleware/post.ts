import {Request, Response, NextFunction} from 'express';

export const addPostToDatabase = (req: Request, res: Response, next: NextFunction) => {
    res.locals.response = {'message': 'post added successfully'};
    next();
}

export const getRecentPosts = (req: Request, res: Response, next: NextFunction) => {
    res.locals.response = {'message': 'There are no posts yet'}
    next();
}

export const getCategories = (req: Request, res: Response, next: NextFunction) => {
    res.locals.response = {'message': 'There are no categories yet'}
    next();
}