import { AudioInputDTO } from 'src/_dto';
import {
  Audio,
  Pack,
} from 'src/_entities';
import {
  AccessControlService,
  AuthPossesion,
} from 'src/auth/service/access-control.service';

import { Filter } from '@nestjs-query/core';
import {
  AuthorizationContext,
  CustomAuthorizer,
  OperationGroup,
} from '@nestjs-query/query-graphql';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserContext } from './model';

@Injectable()
export class AudioAuthorizer implements CustomAuthorizer<AudioInputDTO> {
  NAME = 'loop';
  OWNERKEY = 'authorId';
  constructor(protected acl: AccessControlService) {}

  async authorize(
    context: UserContext,
    authorizationContext?: AuthorizationContext,
  ): Promise<Filter<AudioInputDTO>> {
    const user = context.req.user;
    const resourceId = context.req?.body?.variables?.input?.id;
    // check first global access
    const action = authorizationContext.operationGroup;
    let allowed = this.acl.allowed(
      user.role || 'guest',
      this.NAME,
      action,
      AuthPossesion.ANY,
    );
    if (allowed) {
      return {};
    }

    allowed = this.acl.allowed(user.role, this.NAME, action, AuthPossesion.OWN);
    if (allowed) {
      // if not check if owned resource can be edited
      let resource;
      if (action === OperationGroup.CREATE) {
        const audio: Audio = context.req.body.variables.input[this.NAME];
        resource = await Pack.findOne(audio.packId);
        if(!resource) {
          throw new BadRequestException('Cannot find parent pack to add audio');
        }
      } else {
        const audio: Audio = await Audio.findOne(resourceId, {
          relations: ['pack'],
        });
        resource = audio.pack;
      }
      const ownerId = resource[this.OWNERKEY];
      // special case where you need to get user from parent pack instead of audio directly
      if (user.id == ownerId) {
        return {};
      }
    }

    // return error if not allowed
    throw new UnauthorizedException('authorization error');
  }

  authorizeRelation(
    relationName: string,
    context: UserContext,
  ): Promise<Filter<unknown>> {
    if (relationName === 'todoItem') {
      return Promise.resolve({ ownerId: { eq: context.req.user.id } });
    }
    return Promise.resolve({});
  }
}
