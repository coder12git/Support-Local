import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import Razorpay from 'razorpay';

import Charity from '../../models/charity/charityModel';
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
    cb(null, 'public/images/resources/charity');
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

export const uploadCharityCover = upload.single('coverImage');

interface I_Charity {
  name: string;
  createdBy: string;
  description: string;
  address?: string;
  contact?: string[];
  coverImage?: string;
}

export const createCharity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, createdBy, description, address, contact } = req.body;

  const charityObj: I_Charity = {
    name,
    createdBy,
    description,
    address,
    contact: JSON.parse(contact),
  };

  if (req.file?.filename) {
    charityObj.coverImage = req.file.filename;
  }

  const newCharity = await Charity.create(charityObj);

  res.status(201).json({
    status: 'success',
    data: newCharity,
  });
});

export const getOneCharity = catchAsync(async (req: Request, res: Response) => {
  const charityId = req.params.charityId;
  const charity = await Charity.findById(charityId);

  res.status(200).json({
    status: 'success',
    data: charity,
  });
});

export const donateToCharity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body;

  const instance = new Razorpay({
    key_id: 'rzp_test_9WzCZdN4zjIO4Y',
    key_secret: '1oDMI8bCAiURX1GmuroQ1ZaO',
  });

  const orderObj = {
    amount,
    currency: 'INR',
    notes: {
      description: 'Donating charity',
    },
  };

  instance.orders.create(orderObj, (err: any, order: any) => {
    if (err) {
      return next(new AppError(err.message || err, 400));
    }

    return res.status(200).json(order);
  });
});
