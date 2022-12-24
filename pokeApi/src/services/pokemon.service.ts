import { IPokemon } from "../interfaces/pokemon.interface";
import { Pokemon } from "../models/pokemon.model";
import { WELCOME_MESSAGE } from "../constants/pokeApi.constants";
import { ObjectId } from "mongoose";

export class PokemonService {
  public welcomeMessage(): string {
    return WELCOME_MESSAGE;
  }

  public findAll(): Promise<IPokemon[]> {
    return Pokemon.find({}).exec();
  }

  public add(pokemon: IPokemon): Promise<IPokemon> {
    const newPokemon = new Pokemon(pokemon);
    return newPokemon.save();
  }

  public async delete(id: string) {
    const deletedPokemon: (IPokemon & { _id: ObjectId }) | null = await Pokemon.findByIdAndDelete(
      id
    ).exec();

    if (!deletedPokemon) {
      throw new Error(`Pokemon with id '${id}' not found`);
    }

    return deletedPokemon;
  }

  // Our new update method
  public async update(id: string, pokemon: IPokemon) {
    const updatedPokemon: (IPokemon & { _id: ObjectId }) | null = await Pokemon.findByIdAndUpdate(
      id,
      pokemon
    ).exec();

    if (!updatedPokemon) {
      throw new Error(`Pokemon with id '${id}' not found`);
    }

    return updatedPokemon;
  }
}