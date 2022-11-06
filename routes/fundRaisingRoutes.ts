import express, { Router } from 'express';
import * as fundraisingController from '../controllers/fundraising/fundraisingController';

const router: Router = express.Router();

router.post('/', fundraisingController.uploadFundRaiserCover, fundraisingController.createFundRaiser);
router.post('/donate-funds', fundraisingController.donateFunds);

export default router;
