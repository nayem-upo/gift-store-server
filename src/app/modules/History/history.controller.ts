import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { CustomRequest, HistoryService } from "./history.service";

const createHistory = catchAsync(async (req, res) => {
    const result = await HistoryService.createHistoryIntoDb(req.body, req as unknown as CustomRequest);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'History created successfully',
        data: result,
    });
});

const getHistories = catchAsync(async (req, res) => {
    const result = await HistoryService.getHistoriesFromDb(req as unknown as CustomRequest);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'History retrieved successfully',
        data: result,
    });
});


export const HistoryController = {
    createHistory,
    getHistories
};