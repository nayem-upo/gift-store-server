import { Schema, model } from "mongoose";
import { IHistory } from "./history.interface";

const historySchema = new Schema<IHistory>({
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    date: { type: String, required: true },
    buyer: { type: String, required: true },
    seller: { type: String, required: true },
}, { timestamps: true });

export const HistoryModel = model<IHistory>('History', historySchema);