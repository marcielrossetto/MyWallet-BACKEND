import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authRouter from './router/authRouter.js';
import extractRouter from './router/extractRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(extractRouter);

// Simulando banco de dados
const usuarios = [
  { id: 1, nome: 'Marciel', email: 'marciel@example.com', senha: '1234' },
  { id: 2, nome: 'Fulano', email: 'fulano@example.com', senha: 'abcd' },
];

const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSecreto';

// Middleware para autenticar token JWT
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token não encontrado' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Rota para cadastro (sign-up)
app.post('/auth/sign-up', (req, res) => {
  const { nome, email, senha } = req.body;

  const existe = usuarios.find(u => u.email === email);
  if (existe) return res.status(409).json({ error: 'Usuário já existe' });

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
    senha, // sempre fazer hash da senha em produção!
  };

  usuarios.push(novoUsuario);

  res.status(201).json({ message: 'Usuário criado com sucesso!' });
});

// Rota para obter dados do usuário logado
app.get('/auth/me', autenticarToken, (req, res) => {
  const userId = req.user.id;
  const usuario = usuarios.find(u => u.id === userId);

  if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

  res.json({ id: usuario.id, name: usuario.nome, email: usuario.email });
});

// Rota de login (sign-in)
app.post('/auth/sign-in', (req, res) => {
const { name, email, password, confirmPassword } = req.body;

  const usuario = usuarios.find(u => u.email === email && u.password === password);
  if (!usuario) return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
