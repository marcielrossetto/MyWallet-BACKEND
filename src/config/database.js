import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';

console.log('MONGO_URI:', process.env.MONGO_URI);

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();

const db = client.db();

export const getDb = () => db;
