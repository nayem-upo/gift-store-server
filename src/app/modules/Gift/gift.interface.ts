import { Types } from "mongoose";

interface ICoupon {
    couponCode: string,
    discountPercentage: number
}

export interface IGift extends Document {
    createdBy: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    occasion: string;
    recipient: string;
    category: string;
    theme: string;
    brand: string;
    material: string;
    coupon?: ICoupon
}

export type TQueryParams = {
    page?: number | string;
    limit?: number | string;
    occasion?: string;
    recipient?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    theme?: string;
    provider?: string;
    brand?: string;
    name?: string;
    material?: string;
    searchTerm?: string
};
