import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PacksService } from './packs.service';
import { Pack } from './entities/pack.entity';
import { CreatePackInput } from './dto/create-pack.input';
import { UpdatePackInput } from './dto/update-pack.input';

@Resolver(() => Pack)
export class PacksResolver {
  constructor(private readonly packsService: PacksService) {}

  @Mutation(() => Pack)
  createPack(@Args('createPackInput') createPackInput: CreatePackInput) {
    return this.packsService.create(createPackInput);
  }

  @Query(() => [Pack], { name: 'packs' })
  findAll() {
    return this.packsService.findAll();
  }

  @Query(() => Pack, { name: 'pack' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.packsService.findOne(id);
  }

  @Mutation(() => Pack)
  updatePack(@Args('updatePackInput') updatePackInput: UpdatePackInput) {
    return this.packsService.update(updatePackInput.id, updatePackInput);
  }

  @Mutation(() => Pack)
  removePack(@Args('id', { type: () => Int }) id: number) {
    return this.packsService.remove(id);
  }
}
