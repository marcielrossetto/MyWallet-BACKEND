import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'https://marcielrossetto.github.io',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// outras configurações e rotas aqui...

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
