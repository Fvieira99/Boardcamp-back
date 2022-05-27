import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import connection from "./db.js";
import categoriesRouter from "./routes/categories.js";
import gamesRouter from "./routes/games.js";

dotenv.config();
const server = express();

server.use(cors());
server.use(json());
server.use(categoriesRouter);
server.use(gamesRouter);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
  console.log(`Servidor Funcionando na porta ${PORT}.`)
);
