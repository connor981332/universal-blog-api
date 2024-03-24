import express, {Request, Response, NextFunction} from 'express';
import HttpError from './utils/HttpError';
import postRouter from './routes/post';

const app = express();

app.use('/post', postRouter);

app.use((req, res, next) => {
    const error = new HttpError('The requested resource does not exist.', 404);
    next(error);
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status);
    res.json({
        'Error': err.message,
        'Status': err.status
    });
    console.error(err);
});

export default app;
