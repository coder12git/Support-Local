import mongoose from 'mongoose';

const charitySchema: mongoose.Schema = new mongoose.Schema(
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
    totalDontations: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Charity = mongoose.model('Charity', charitySchema);

export default Charity;
