import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RaveService } from './rave.service';
import { Rave } from './entities/rave.entity';
import { CreateRaveInput } from './dto/create-rave.input';
import { UpdateRaveInput } from './dto/update-rave.input';

@Resolver(() => Rave)
export class RaveResolver {
  constructor(private readonly raveService: RaveService) {}

  @Mutation(() => Rave)
  createRave(@Args('createRaveInput') createRaveInput: CreateRaveInput) {
    return this.raveService.create(createRaveInput);
  }

  @Query(() => [Rave], { name: 'rave' })
  findAll() {
    return this.raveService.findAll();
  }

  @Query(() => Rave, { name: 'rave' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.raveService.findOne(id);
  }

  @Mutation(() => Rave)
  updateRave(@Args('updateRaveInput') updateRaveInput: UpdateRaveInput) {
    return this.raveService.update(updateRaveInput.id, updateRaveInput);
  }

  @Mutation(() => Rave)
  removeRave(@Args('id', { type: () => Int }) id: number) {
    return this.raveService.remove(id);
  }
}
