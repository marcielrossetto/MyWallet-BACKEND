import express from 'express';
<<<<<<< HEAD
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
=======
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
    res.status(500).send('Erro interno do Servidor');
});

app.listen(port, () =>{
    console.log('Servidor rodando na porta ${port');
});

>>>>>>> 1cd2da9d48ad9a5bef3e2cb7f5827ac96809f10f
