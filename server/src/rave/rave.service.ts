import { Injectable } from '@nestjs/common';
import { CreateRaveInput } from './dto/create-rave.input';
import { UpdateRaveInput } from './dto/update-rave.input';

@Injectable()
export class RaveService {
  create(createRaveInput: CreateRaveInput) {
    return 'This action adds a new rave';
  }

  findAll() {
    return `This action returns all rave`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rave`;
  }

  update(id: number, updateRaveInput: UpdateRaveInput) {
    return `This action updates a #${id} rave`;
  }

  remove(id: number) {
    return `This action removes a #${id} rave`;
  }
}
