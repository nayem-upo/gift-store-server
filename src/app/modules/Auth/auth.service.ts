// AuthService.service.ts 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import config from '../../config';
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';

const registerUserToDb = async (user: IUser) => {
    const { username, email, password, role } = user;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = {
        username,
        email,
        password: hashedPassword,
        role: role,
    };

    const result = await UserModel.create(newUser);
    const token = generateAuthToken(user);

    return { result, token };
};

const loginUser = async (username: string, password: string) => {
    const user = await UserModel.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid username or password');
    }

    const token = generateAuthToken(user);

    return { user, token };
};

const generateAuthToken = (user: IUser) => {
    const token = jwt.sign(
        {
            _id: user._id,
            role: user.role,
            email: user.email,
        },
        config.jwt_access_secret as string,
        {
            expiresIn: config.jwt_access_expires_in,
        }
    );
    return token;
};



const changeUserPassword = async (
    userId: string,
    currentPassword: string,
    newPassword: string
) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
    );
    if (!isCurrentPasswordValid) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Current password is incorrect'
        );
    }


    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    const updatedUser = await user.save();
    return updatedUser;
};


export const AuthService = {
    registerUserToDb,
    loginUser,
    changeUserPassword
}