import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });
mongoose.connect(process.env.DB_URI!);

import app from './app';



const port: string | number = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started at port ${port}`));
