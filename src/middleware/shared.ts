import {Request, Response, NextFunction} from 'express';

export const sendResponse = (req: Request, res: Response, next: NextFunction) => {
    res.json(res.locals.response);
}