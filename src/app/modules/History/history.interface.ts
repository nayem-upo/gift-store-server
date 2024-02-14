import { Types } from "mongoose";

export interface IHistory extends Document {
    createdBy: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    date: string,
    buyer: string
}