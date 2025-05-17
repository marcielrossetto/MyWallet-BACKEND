import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URL);
let db;

try {
  await mongoClient.connect();
  db = mongoClient.db();
  console.log("MongoDB conectado!");
} catch (err) {
  console.error("Erro na conexão com o MongoDB", err);
}

export default db;
