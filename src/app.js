// src/app.js

import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import transactionRouter from "./routers/transactionRouter.js";

const app = express();

// Configura CORS para aceitar requisições do GitHub Pages
app.use(cors({
  origin: "https://marcielrossetto.github.io",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Permite o uso de JSON no corpo das requisições
app.use(express.json());

// Define as rotas da aplicação
app.use(authRouter);
app.use(transactionRouter);

export default app;
