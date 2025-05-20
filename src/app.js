import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/authRouter.js';
import transactionRouter from './routers/transactionRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter); // Sem prefixo
app.use(transactionRouter);

export default app;
