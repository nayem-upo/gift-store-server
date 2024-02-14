// gift.controller.ts
import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { GiftServices } from "./gift.service";
import { IGift } from "./gift.interface";

const createGift = catchAsync(async (req, res) => {
    const result = await GiftServices.createGiftIntoDb(req.body, req);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Gift created successfully',
        data: result,
    });
})

const getGifts = catchAsync(async (req, res) => {
    try {
        const gifts = await GiftServices.getGiftsFromDb(req.query);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Gifts retrieved successfully',
            meta: {
                page: gifts.page,
                limit: gifts.limit,
                total: gifts.total,
            },
            data: gifts.data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal Server Error',
            errorDetails: error,
        });
    }
});

const getSingleGift = catchAsync(async (req, res) => {
    const giftId = req.params.giftId;
    const result = await GiftServices.getSingleGiftFromDb(giftId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single gift retrieved successfully',
        data: result,
    });
})
const updateGift = catchAsync(async (req, res) => {
    const giftId: string = req.params.giftId;
    const updateData: Partial<IGift> = req.body;
    const updatedGift = await GiftServices.updateGiftById(giftId, updateData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Gift updated successfully!',
        data: updatedGift,
    });
})

const deleteGift = catchAsync(async (req, res) => {
    const id: string = req.params.giftId;
    const result = await GiftServices.deleteGiftFromDb(id);
    res.send(result)
})

const deleteMultipleGifts = catchAsync(async (req, res) => {
    const { giftIds } = req.body;
    const result = await GiftServices.deleteMultipleGiftsFromDb(giftIds);
    res.send(result);
});

export const GiftController = {
    createGift,
    getGifts,
    updateGift,
    deleteGift,
    getSingleGift,
    deleteMultipleGifts
}