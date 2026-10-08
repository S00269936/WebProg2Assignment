import { Request, Response, NextFunction } from 'express';

export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
};