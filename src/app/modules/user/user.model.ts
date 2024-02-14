// user.model.ts
import { Schema, model, Model } from "mongoose";
import { IUser } from "./user.interface";

interface IUserModel extends Model<IUser> {
    // eslint-disable-next-line no-unused-vars
    isUserExistsByCustomId(id: string): Promise<IUser | null>;
}

const userSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // role: { type: String, default: 'manager' },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},
    { timestamps: true }
);
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await this.findOne({ id }).select('+password');
};

export const UserModel = model<IUser, IUserModel>('User', userSchema);