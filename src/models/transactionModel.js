import { getDb } from '../config/database.js';
import { ObjectId } from 'mongodb';

const createTransaction = async (userId, transactionData) => {
  const db = getDb();
  const transactionsCollection = db.collection('transactions');

  const newTransaction = {
    ...transactionData,
    userId: new ObjectId(userId),
    date: new Date()
  };

  const result = await transactionsCollection.insertOne(newTransaction);
  return result.insertedId;
};

const getTransactionsByUserId = async (userId, page = 1, limit = 10) => {
  const db = getDb();
  const transactionsCollection = db.collection('transactions');
  const skip = (page - 1) * limit;

  const transactions = await transactionsCollection
    .find({ userId: new ObjectId(userId) })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  return transactions;
};

const getTransactionById = async (transactionId, userId) => {
  const db = getDb();
  const transactionsCollection = db.collection('transactions');

  const transaction = await transactionsCollection.findOne({
    _id: new ObjectId(transactionId),
    userId: new ObjectId(userId)
  });

  return transaction;
};

const updateTransaction = async (transactionId, userId, updatedData) => {
  const db = getDb();
  const transactionsCollection = db.collection('transactions');

  const result = await transactionsCollection.updateOne(
    { _id: new ObjectId(transactionId), userId: new ObjectId(userId) },
    { $set: updatedData }
  );

  return result.modifiedCount;
};

const deleteTransaction = async (transactionId, userId) => {
  const db = getDb();
  const transactionsCollection = db.collection('transactions');

  const result = await transactionsCollection.deleteOne({
    _id: new ObjectId(transactionId),
    userId: new ObjectId(userId)
  });

  return result.deletedCount;
};

export {
  createTransaction,
  getTransactionsByUserId,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};
