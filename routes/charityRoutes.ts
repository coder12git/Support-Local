import express, { Router } from 'express';
import * as charityController from '../controllers/charity/charityController';

const router: Router = express.Router();

router.post('/', charityController.uploadCharityCover, charityController.createCharity);
router.post('/donate', charityController.donateToCharity);

export default router;
