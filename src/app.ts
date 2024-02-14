// app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();
app.use(cors({ origin: "*", credentials: true }));

// middlewares
app.use(express.json());

// routes
app.use('/', router);

app.get('/', (req: Request, res: Response) => {
  res.send("Gift Shop Management is running")
})

app.use(globalErrorHandler);
//not found route
app.use(notFound);

export default app;