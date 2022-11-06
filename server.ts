import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });
mongoose.connect("mongodb+srv://ruchi:Kumari123@cluster0.kdsaye1.mongodb.net/supportDB");

import app from './app';



const port: string | number = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started at port ${port}`));
