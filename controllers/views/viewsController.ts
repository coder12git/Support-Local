import { Request, Response } from 'express';
import Charity from '../../models/charity/charityModel';
import catchAsync from '../../utils/catchAsync';

export const getOneCharity = catchAsync(async (req: Request, res: Response) => {
  const charityId = req.params.charityId;
  const charity = await Charity.findById(charityId);

  res.render('charityPost', {
    charity
  });
});
