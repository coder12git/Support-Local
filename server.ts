import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

import app from './app';

const port: string | number = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started at port ${port}`));
