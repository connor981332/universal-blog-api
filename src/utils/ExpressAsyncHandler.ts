import { Request, Response, NextFunction } from 'express';

const expressAsyncHandler = (asyncMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        asyncMiddleware(req, res, next)
            .then(() => {
                return;
            })
            .catch((err) => {
                next(err);
            });
    };
};

export default expressAsyncHandler;
