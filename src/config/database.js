import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';

console.log('MONGO_URI:', process.env.MONGO_URI);

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();

const db = client.db();

<<<<<<< HEAD
export const getDb = () => db;
=======
export const getDB = () => db;
>>>>>>> 1cd2da9d48ad9a5bef3e2cb7f5827ac96809f10f
