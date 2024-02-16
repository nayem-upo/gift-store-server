import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../modules/user/user.interface';
import config from '../config';
import { UnauthorizedError } from '../errors/AppError';
import httpStatus from 'http-status';
import { USER_ROLE } from '../modules/user/user.constant';

const JWT_SECRET = config.jwt_access_secret as string;

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the request headers
    const token = req.header('Authorization');

    if (!token) {
        throw new UnauthorizedError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET) as IUser;
        req.user = decoded;
        next();
    } catch (error) {
        throw new UnauthorizedError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
};



// check if the user is a manager 
export const isManager = (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = req.user as IUser;


    if (user && user.role === USER_ROLE.manager) {
        next();
    } else {
        throw new UnauthorizedError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
};
// check if the user is a seller
export const isSeller = (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = req.user as IUser;


    if (user && user.role === USER_ROLE.seller) {
        next();
    } else {
        throw new UnauthorizedError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
};


