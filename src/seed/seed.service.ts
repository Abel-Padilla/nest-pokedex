import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) { }

  private readonly axios: AxiosInstance = axios;

  async excecuteSeed() {

    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`);

    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      pokemonToInsert.push(
        {
          no,
          name
        }
      );

    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return { result: true, message: 'Seed excecuted!' };
  }
}
