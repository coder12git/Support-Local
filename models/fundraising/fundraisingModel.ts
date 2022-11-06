import mongoose from 'mongoose';

const fundraisingSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of the charity'],
      unique: true,
    },
    createdBy: {
      type: String,
      required: [true, 'Please provide the email'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide the description'],
      maxLength: 5000,
    },
    address: {
      type: String,
      required: [true, 'Please provide the location'],
    },
    contact: {
      type: [String],
      required: [true, 'Please provide the contact details'],
    },
    coverImage: {
      type: String,
    },
    totalFunds: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const FundRaising = mongoose.model('FundRaising', fundraisingSchema);

export default FundRaising;
