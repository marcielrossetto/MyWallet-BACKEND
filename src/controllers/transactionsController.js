import {
  createTransaction,
  getTransactionsByUserId,
  getTransactionById,
  updateTransaction,
  deleteTransaction as deleteTransactionFromModel
} from '../models/transactionModel.js';

const addTransaction = async (req, res) => {
  try {
    const { value, description, type } = req.body;
    const userId = req.user.userId;

    const transactionId = await createTransaction(userId, { value, description, type });
    res.status(201).send({ message: 'Transação adicionada com sucesso!', transactionId });

  } catch (err) {
    console.error("Erro ao adicionar transação:", err);
    res.status(500).send({ message: 'Erro ao adicionar transação.' });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;
    let { page } = req.query;

    page = parseInt(page);
    if (isNaN(page) || page <= 0) {
      return res.status(400).send({ message: 'O parâmetro "page" deve ser um número positivo.' });
    }

    const transactions = await getTransactionsByUserId(userId, page);
    res.status(200).send(transactions);

  } catch (err) {
    console.error("Erro ao obter transações:", err);
    res.status(500).send({ message: 'Erro ao obter transações.' });
  }
};

const editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { value, description, type } = req.body;
    const userId = req.user.userId;

    const transaction = await getTransactionById(id, userId);
    if (!transaction) {
      return res.status(401).send({ message: "Você não tem permissão para editar esta transação." });
    }

    const updated = await updateTransaction(id, userId, { value, description, type });
    if (updated === 0) {
      return res.status(404).send({ message: "Transação não encontrada." });
    }

    res.status(204).send();

  } catch (err) {
    console.error("Erro ao editar transação:", err);
    res.status(500).send({ message: 'Erro ao editar transação.' });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const transaction = await getTransactionById(id, userId);
    if (!transaction) {
      return res.status(401).send({ message: "Você não tem permissão para deletar esta transação." });
    }

    const deleted = await deleteTransactionFromModel(id, userId);
    if (deleted === 0) {
      return res.status(404).send({ message: "Transação não encontrada." });
    }

    res.status(204).send();

  } catch (err) {
    console.error("Erro ao deletar transação:", err);
    res.status(500).send({ message: 'Erro ao deletar transação.' });
  }
};

export {
  addTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction
};
