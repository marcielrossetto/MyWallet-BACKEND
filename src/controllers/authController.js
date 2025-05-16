import { getDb } from '../config/database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Entrou no signUp:', { name, email });
  try {
    const db = getDb();
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      console.log('Email já registrado:', email);
      return res.status(422).send({ errors: ['Email já registrado'] });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword
    });
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET não está definido no .env');
      return res.status(500).send({ errors: ['Erro de configuração do servidor'] });
    }
    const token = jwt.sign({ userId: result.insertedId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Usuário cadastrado:', email);
    res.status(201).send({ token });
  } catch (error) {
    console.error('Erro no signUp:', error);
    res.status(500).send({ errors: ['Erro interno do servidor'] });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log('Entrou no signIn:', { email });
  try {
    const db = getDb();
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      console.log('Usuário não encontrado:', email);
      return res.status(404).send({ errors: ['Usuário não encontrado'] });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      console.log('Senha incorreta para:', email);
      return res.status(401).send({ errors: ['Senha incorreta'] });
    }
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET não está definido no .env');
      return res.status(500).send({ errors: ['Erro de configuração do servidor'] });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token gerado para:', email);
    res.status(200).send({ token });
  } catch (error) {
    console.error('Erro no signIn:', error);
    res.status(500).send({ errors: ['Erro interno do servidor'] });
  }
};