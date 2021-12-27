import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AudiosService } from './audios.service';
import { Audio } from '../_entities/audio.entity';
import { CreateAudioInput } from './dto/create-audio.input';
import { UpdateAudioInput } from './dto/update-audio.input';

@Resolver(() => Audio)
export class AudiosResolver {
  constructor(private readonly audiosService: AudiosService) {}

  @Mutation(() => Audio)
  createAudio(@Args('createAudioInput') createAudioInput: CreateAudioInput) {
    return this.audiosService.create(createAudioInput);
  }

  @Query(() => [Audio], { name: 'audios' })
  findAll() {
    return this.audiosService.findAll();
  }

  @Query(() => Audio, { name: 'audio' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.audiosService.findOne(id);
  }

  @Mutation(() => Audio)
  updateAudio(@Args('updateAudioInput') updateAudioInput: UpdateAudioInput) {
    return this.audiosService.update(updateAudioInput.id, updateAudioInput);
  }

  @Mutation(() => Audio)
  removeAudio(@Args('id', { type: () => Int }) id: number) {
    return this.audiosService.remove(id);
  }
}
