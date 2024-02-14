// gift.service.ts
/* eslint-disable no-unused-vars */
import { Request } from "express";
import { IGift, TQueryParams } from "./gift.interface";
import { JwtPayload } from "jsonwebtoken";
import { GiftModel } from "./gift.model";
import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { giftSearchableFields } from "./gift.constant";

const createGiftIntoDb = async (payload: IGift, req: Request) => {
    const userId = (req.user as JwtPayload);
    const { name, price, quantity, occasion, recipient, category, theme, brand, material } = payload;

    if (price < 0) {
        throw new AppError(httpStatus.FORBIDDEN, "Price should greater than 0")
    }
    if (quantity < 0) {
        throw new AppError(httpStatus.FORBIDDEN, "Quantity should greater than 0")
    }

    const newGiftWithUserId = {
        name,
        price,
        quantity,
        occasion,
        recipient,
        category,
        theme,
        brand,
        material,
        createdBy: userId
    }
    const result = await GiftModel.create(newGiftWithUserId);
    return result;
}


const getGiftsFromDb = async (query: TQueryParams) => {
    const { page = 1, limit = 1000, searchTerm, brand, name, material, minPrice, maxPrice, category, occasion, recipient, theme, provider } = query;
    const escapedSearchTerm = searchTerm?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    let queryBuilder = GiftModel.find();

    if (searchTerm) {
        queryBuilder = GiftModel.find({
            $or: giftSearchableFields.map((field) => ({
                [field]: { $regex: escapedSearchTerm, $options: 'i' },
            })),
        });
    } else {
        const caseInsensitiveRegex = (value: string | undefined, shouldIgnoreCase: boolean = true) => (
            value ? new RegExp(value, shouldIgnoreCase ? 'i' : '') : undefined
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: any = {};
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        if (occasion) filter.occasion = caseInsensitiveRegex(occasion);
        if (provider) filter.provider = caseInsensitiveRegex(provider);
        if (recipient) filter.recipient = caseInsensitiveRegex(recipient);
        if (category) filter.category = caseInsensitiveRegex(category);
        if (name) filter.name = caseInsensitiveRegex(name);
        if (theme) filter.theme = caseInsensitiveRegex(theme);
        if (brand) filter.brand = caseInsensitiveRegex(brand);
        if (material) filter.material = caseInsensitiveRegex(material);

        queryBuilder.find(filter);
    }

    const skip = (parseInt(page.toString(), 10) - 1) * parseInt(limit.toString(), 10);

    const [data, total] = await Promise.all([
        queryBuilder
            .skip(skip)
            .limit(parseInt(limit.toString(), 10))
            .populate('createdBy', '_id username email role')
            .exec(),
        GiftModel.countDocuments(queryBuilder.getFilter()),
    ]);

    return {
        page: parseInt(page.toString(), 10),
        limit: parseInt(limit.toString(), 10),
        total,
        data,
    };
}

const getSingleGiftFromDb = async (query: string) => {
    const result = GiftModel.findById({ _id: query });
    return result;
}

const updateGiftById = async (giftId: string, updateData: Partial<IGift>) => {
    const { ...otherFields } = updateData;

    const updatedData: Record<string, unknown> = { ...otherFields };

    const result = await GiftModel.findOneAndUpdate({ _id: giftId }, updatedData, {
        new: true,
    }).populate('createdBy', '_id username email role');

    return result;
};

const deleteGiftFromDb = async (_id: string) => {
    const result = await GiftModel.deleteOne({ _id });
    if (result.deletedCount === 0) {
        return { statusCode: httpStatus.NOT_FOUND, success: false, message: 'Gift not found', data: result, };
    }
    return {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Gift deleted successfully',
        data: result,
    };

};

const deleteMultipleGiftsFromDb = async ({ giftIds }: { giftIds: string[] }) => {
    const result = await GiftModel.deleteMany({ _id: { $in: giftIds } });
    if (result.deletedCount === 0) {
        return {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'No gifts found for deletion',
            data: result,
        };
    }
    return {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Gifts deleted successfully',
        data: result,
    };
};



export const GiftServices = {
    deleteGiftFromDb,
    createGiftIntoDb,
    getGiftsFromDb,
    updateGiftById,
    getSingleGiftFromDb,
    deleteMultipleGiftsFromDb
};
