import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

  ) { };

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {

    let pokemon: Pokemon | null = null;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }

    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term)
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
    }

    if (!pokemon)
      throw new NotFoundException(`Pokemon with the term of search ${term} not found`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      const updatedPokeon = await pokemon.updateOne(updatePokemonDto);
      return { ...updatePokemonDto, ...pokemon.toJSON() };
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(@Param('id',) id: string) {
    //const pokemon = await this.findOne(id);
    const { deletedCount, acknowledged } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with ID ${id} not found`);

    return { count: deletedCount, result: true };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    }
    throw new InternalServerErrorException(`Can't create Pokemon, check the server logs.`)
  }
}
