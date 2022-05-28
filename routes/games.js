import { Router } from "express";
import { addGame, listGames } from "../controllers/games.js";
import addGameValidation from "../middlewares/add-game.js";

const gamesRouter = Router();

gamesRouter.get("/games", listGames);
gamesRouter.post("/games", addGameValidation, addGame);

export default gamesRouter;
