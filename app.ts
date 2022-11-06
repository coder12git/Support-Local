// Imports from libraries
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

// Imports from project
import globalErrorHandler from './controllers/error/errorController';
import viewsRouter from './routes/viewsRoutes';
import charityRouter from './routes/charityRoutes';
import fundRaiserRouter from './routes/fundRaisingRoutes';
import AppError from './utils/appError';

const app: Application = express();

// -----------------------------------
// MIDDLEWARE STACK

// Development middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS middleware
app.use(cors());

// Req body modifiers
app.use(express.json());

// Views middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// -----------------------------------
// ROUTERS

app.use('/charity', charityRouter);
app.use('/fund-raiser', fundRaiserRouter);
app.use('/', viewsRouter);

app.get('/charityPost',function(req,res){
  res.render("charityPost");
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
