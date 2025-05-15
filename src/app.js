import express from 'express';
import cors from ' cors';
import dotenv from 'dotenv';
import { authRouther} from './routher/authRouter.js';
import { transactionsRouther } from './routers/transactionsRouter.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use('/transactions', transactionsRouter);

app.get('/', (req,res)=>{
    res.send('MyWallet API is Runing');
});

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send('Erro interno do Servido');
});

app.listen(port, () =>{
    console.log('Servidor rodando na porta ${port');
});

