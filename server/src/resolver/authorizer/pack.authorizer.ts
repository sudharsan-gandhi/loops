import { PackInputDTO } from 'src/_dto';
import { Pack } from 'src/_entities';
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
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserContext } from './model';

@Injectable()
export class PackAuthorizer implements CustomAuthorizer<PackInputDTO> {
  NAME = 'pack';
  OWNERKEY = 'authorId';

  constructor(protected acl: AccessControlService) {}

  async authorize(
    context: UserContext,
    authorizationContext?: AuthorizationContext,
  ): Promise<Filter<PackInputDTO>> {
    const user = context.req.user;
    const resourceId = context.req?.body?.variables?.input?.id;
    // check first global access
    const action = authorizationContext.operationGroup;
    let allowed = await this.acl.allowed(
      user?.role || 'guest',
      this.NAME,
      action,
      AuthPossesion.ANY,
    );
    if (allowed) {
      return {};
    }

    allowed = await this.acl.allowed(
      user?.role || 'guest',
      this.NAME,
      action,
      AuthPossesion.OWN,
    );
    if (allowed) {
      // if not check if owned resource can be edited
      let resource;
      if (action === OperationGroup.CREATE) {
        resource = context.req.body.variables.input[this.NAME];
      } else {
        resource = await Pack.findOne(resourceId);
      }
      const ownerId = resource ? resource[this.OWNERKEY] : undefined;
      if (user.id == ownerId) {
        resource[this.OWNERKEY] = ownerId;
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
