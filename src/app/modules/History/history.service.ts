import { JwtPayload } from "jsonwebtoken";
import { IHistory } from "./history.interface";
import { HistoryModel } from "./history.model";

export interface CustomRequest extends Request {
    user?: JwtPayload;
    query?: { filter: string }
}
const createHistoryIntoDb = async (payload: IHistory, req: CustomRequest) => {
    const userId = (req.user as JwtPayload)?._id;
    const { name, price, quantity, buyer, date, seller, discountPercentage } = payload;
    const newGiftWithUserId = {
        createdBy: userId,
        name,
        price,
        quantity,
        date,
        buyer,
        seller,
        discountPercentage
    }
    const result = await HistoryModel.create(newGiftWithUserId);
    return result;
}


const getHistoriesFromDb = async (req: CustomRequest) => {
    const { filter } = req.query || { filter: 'defaultFilter' };
    const currentDate = new Date();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dateFilter: any = {};

    if (filter === 'daily') {
        dateFilter = {
            createdAt: { $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1) }
        };
    } else if (filter === 'weekly') {
        dateFilter = {
            createdAt: { $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()), $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay()) + 1) }
        };
    } else if (filter === 'monthly') {
        dateFilter = {
            createdAt: { $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0) }
        };
    } else if (filter === 'yearly') {
        dateFilter = {
            createdAt: { $gte: new Date(currentDate.getFullYear(), 0, 1), $lt: new Date(currentDate.getFullYear() + 1, 0, 1) }
        };
    }

    const result = await HistoryModel.find(dateFilter);
    return result;
};


export const HistoryService = {
    createHistoryIntoDb,
    getHistoriesFromDb
};
