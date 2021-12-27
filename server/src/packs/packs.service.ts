import { Injectable } from '@nestjs/common';
import { CreatePackInput } from './dto/create-pack.input';
import { UpdatePackInput } from './dto/update-pack.input';

@Injectable()
export class PacksService {
  create(createPackInput: CreatePackInput) {
    return 'This action adds a new pack';
  }

  findAll() {
    return `This action returns all packs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pack`;
  }

  update(id: number, updatePackInput: UpdatePackInput) {
    return `This action updates a #${id} pack`;
  }

  remove(id: number) {
    return `This action removes a #${id} pack`;
  }
}
