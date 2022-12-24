import { MONGO_URL } from "./constants/pokeApi.constants";
import { PokemonController } from "./pokemon.controller";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { PokemonService } from "./services/pokemon.service";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions);
    mongoose.set("toJSON", {
        virtuals: true,
        transform: (_: any, converted: any) => {
          delete converted._id;
        },
      });
  }

  private setControllers() {
    const pokemonController = new PokemonController(new PokemonService());

    this.app.use("/pokemon", pokemonController.router);
  }
}

export default new App().app;