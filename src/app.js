import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { authRouter } from './routers/authRouter.js';
import { transactionsRouter } from './routers/transactionsRouter.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas - sempre com prefixo para facilitar manutenção
app.use('/auth', authRouter);
app.use('/transactions', transactionsRouter);

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
