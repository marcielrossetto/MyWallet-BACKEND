import express from 'express';
import { addTransaction, getTransactions, editTransaction, deleteTransaction } from '../controllers/transactionsController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { transactionSchema } from '../schemas/transactionSchema.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const transactionsRouter = express.Router();

transactionsRouter.use(authMiddleware);

transactionsRouter.post('/', validateSchema(transactionSchema), addTransaction);
transactionsRouter.get('/', getTransactions);
transactionsRouter.put('/:id', validateSchema(transactionSchema), editTransaction);
transactionsRouter.delete('/:id', deleteTransaction);

export { transactionsRouter };
