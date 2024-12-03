/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './app/config/swagger.config';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

// application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/test', test);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
