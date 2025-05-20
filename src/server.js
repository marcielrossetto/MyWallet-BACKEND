import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'https://marcielrossetto.github.io',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json()); // importante para ler o body JSON

// suas rotas aqui

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
