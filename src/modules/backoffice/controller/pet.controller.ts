import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { PetService } from '../services/pet.service';
import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreatePetContract } from '../contracts/pet/create-pet.contract';
import { Pet } from '../models/pet.model';
import { Result } from '../models/result.model';

@Controller('v1/pets')
export class PetController {

  constructor(private readonly petService: PetService) {
  }

  @Post(':document')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async addPet(
    @Param('document') document,
    @Body() model: Pet,
  ) {
    try {
      const customer = await this.petService.create(document, model);
      return new Result(`Pet criado com sucesso`, true, customer, null);
    } catch (error) {
      throw new HttpException(new Result(`Não foi possível adicionar o pet`, false, null, error), HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':document/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(
    @Param('document') document,
    @Param('id') id,
    @Body() model: Pet,
  ) {
    try {
      const customer = await this.petService.update(document, id, model);
      return new Result(`Pet alterado com sucesso`, true, customer, null);
    } catch (error) {
      throw new HttpException(new Result(`Não foi possível alterar o pet`, false, null, error), HttpStatus.BAD_REQUEST);
    }
  }
}
