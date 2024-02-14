// user.interface.ts
import { Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: 'manager' | 'seller';
    createdAt: Date;
    updatedAt: Date;
}

export type TUserRole = keyof typeof USER_ROLE;