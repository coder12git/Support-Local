// Imports from libraries
import express, { Application } from 'express';
import morgan from 'morgan';

// Imports from project
import viewsRouter from './routes/viewsRoutes';

const app: Application = express();

// -----------------------------------
// MIDDLEWARE STACK

// Development middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Views middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));

// -----------------------------------
// ROUTERS

app.use('/', viewsRouter);

export default app;
