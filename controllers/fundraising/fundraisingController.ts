import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import Razorpay from 'razorpay';

import FundRaising from '../../models/fundraising/fundraisingModel';
import AppError from '../../utils/appError';
import catchAsync from '../../utils/catchAsync';

interface ICharity {
  name: string;
  createdBy: string;
  description: string;
  address: string;
  contact: Array<string>;
}

type MulterFilterFunction = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => void;

const multerStorage: multer.StorageEngine = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'public/images/resources/fundraising');
  },
  filename: (req, file: Express.Multer.File, cb) => {
    const ext = file.mimetype.split('/')[1];
    const imageId: string = uuidv4();

    cb(null, `charity-${imageId}-${Date.now()}.${ext}`);
  },
});

const multerFilter: MulterFilterFunction = (req, file, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please provide only image', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadFundRaiserCover = upload.single('coverImage');

interface I_Funds {
  name: string;
  createdBy: string;
  description: string;
  address?: string;
  contact?: string[];
  coverImage?: string;
}

export const createFundRaiser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, createdBy, description, address, contact } = req.body;

  const fundRaiserObj: I_Funds = {
    name,
    createdBy,
    description,
    address,
    contact: JSON.parse(contact),
  };

  if (req.file?.filename) {
    fundRaiserObj.coverImage = req.file.filename;
  }

  const newFundRaiser = await FundRaising.create(fundRaiserObj);

  res.status(201).json({
    status: 'success',
    data: newFundRaiser,
  });
});

export const getOneFundRaiser = catchAsync(async (req: Request, res: Response) => {
  const fundRaiserId = req.params.fundRaiserId;
  const fundRaiser = await FundRaising.findById(fundRaiserId);

  res.status(200).json({
    status: 'success',
    data: fundRaiser,
  });
});

export const donateFunds = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body;

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const orderObj = {
    amount,
    currency: 'INR',
    notes: {
      description: 'Donating funds',
    },
  };

  instance.orders.create(orderObj, (err: any, order: any) => {
    if (err) {
      return next(new AppError(err.message || err, 400));
    }

    return res.status(200).json(order);
  });
});
