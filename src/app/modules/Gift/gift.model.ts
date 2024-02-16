import { Schema, model } from "mongoose";
import { IGift } from "./gift.interface";


const giftSchema = new Schema<IGift>({
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    occasion: { type: String, required: true },
    recipient: { type: String, required: true },
    category: { type: String, required: true },
    theme: { type: String, required: true },
    brand: { type: String, required: true },
    material: { type: String, required: true },
    coupon: {
        couponCode: { type: String },
        discountPercentage: { type: Number, required: true },
    },
}, { timestamps: true });

export const GiftModel = model<IGift>('Gift', giftSchema);