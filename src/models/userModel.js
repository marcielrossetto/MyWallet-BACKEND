import { getDb } from "../config/database.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const createUser = async (userData) => {
  const db = getDb();
  const usersCollection = db.collection("users");

  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  const newUser = {
    ...userData,
    password: hashedPassword,
  };

  const result = await usersCollection.insertOne(newUser);
  return result.insertedId;
};

const getUserByEmail = async (email) => {
  const db = getDb();
  const usersCollection = db.collection("users");
  return await usersCollection.findOne({ email });
};

export { createUser, getUserByEmail };
