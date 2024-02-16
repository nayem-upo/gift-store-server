// gift.routes.ts
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { isAuthenticated } from '../../middlewares/authMiddleware';
import { GiftValidations } from './gift.validation';
import { GiftController } from './gift.controller';
import checkJwt from '../../middlewares/checkJwt';
import { HistoryValidations } from '../History/history.validation';
import { HistoryController } from '../History/history.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
    '/gifts',
    auth(USER_ROLE.manager),
    checkJwt, isAuthenticated,
    validateRequest(GiftValidations.createGiftValidationSchema),
    GiftController.createGift
);
router.delete('/gifts/:giftId',
    auth(USER_ROLE.manager, USER_ROLE.seller),
    checkJwt, isAuthenticated, GiftController.deleteGift
);
router.get('/gifts', checkJwt, GiftController.getGifts);
router.get('/gifts/:giftId', checkJwt, GiftController.getSingleGift);

router.delete('/gift/bulk-delete',
    auth(USER_ROLE.manager),
    checkJwt, GiftController.deleteMultipleGifts
);

router.put('/gifts/:giftId',
    auth(USER_ROLE.manager, USER_ROLE.seller),
    checkJwt, isAuthenticated,
    validateRequest(GiftValidations.updateGiftValidationSchema),
    GiftController.updateGift
);
router.post('/history',
    auth(USER_ROLE.seller),
    checkJwt, isAuthenticated,
    validateRequest(HistoryValidations.createHistorySchema),
    HistoryController.createHistory
);
router.get('/history', checkJwt, isAuthenticated, HistoryController.getHistories);

export const GiftRoutes = router;