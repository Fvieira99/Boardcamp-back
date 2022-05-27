import { Router } from "express";
import { addGame, listGames } from "../controllers/games.js";

const gamesRouter = Router();

gamesRouter.get("/games", listGames);
gamesRouter.post("/games", addGame);

export default gamesRouter;
