import express, {Request, Response, NextFunction} from 'express';
import HttpError from './utils/HttpError';
import postRouter from './routes/post';

const app = express();

app.use(express.json()); // Allows for parsing JSON req bodies

app.use('/post', postRouter);

app.use((req, res, next) => {
    const error = new HttpError('The requested resource does not exist.', 404);
    next(error);
});

// Catches any errors that have been thrown that are not of type HttpError and passes them to the next error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
        next(err);
    } else {
        console.error('Someone threw an error that was not of type HttpError');
        next(new HttpError(err.message, 500));
    }
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
