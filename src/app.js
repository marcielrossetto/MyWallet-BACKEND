import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/authRouter.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://marcielrossetto.github.io',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

app.use(authRouter);

export default app;
