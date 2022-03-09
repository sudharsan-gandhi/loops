import { UserInputDTO } from 'src/_dto';
import { User } from 'src/_entities';
import {
  AccessControlService,
  AuthAction,
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
export class UserAuthorizer implements CustomAuthorizer<UserInputDTO> {
  NAME = 'user';
  OWNERKEY = 'id';

  constructor(protected acl: AccessControlService) {}

  async authorize(
    context: UserContext,
    authorizationContext?: AuthorizationContext,
  ): Promise<Filter<UserInputDTO>> {
    const user = context.req.user;
    const resourceId = context.req?.body?.variables?.input?.id;
    const action = authorizationContext.operationGroup;

    if (
      action === OperationGroup.UPDATE &&
      context.req?.body?.variables?.input?.update
    ) {
      const input = context.req?.body?.variables?.input?.update;
      context.req.body.variables.input.update = this.acl.filter(
        user?.role || 'user',
        this.NAME,
        action,
        AuthPossesion.ANY,
        input,
      );
    }
    if (
      action === OperationGroup.CREATE &&
      context.req?.body?.variables?.input[this.NAME.toLowerCase()] !== undefined
    ) {
      const input =
        context.req?.body?.variables?.input[this.NAME.toLowerCase()];
      context.req.body.variables.input[this.NAME.toLowerCase()] =
        this.acl.filter(
          user?.role || 'user',
          this.NAME,
          action,
          AuthPossesion.ANY,
          input,
        );
    }

    let allowed = this.acl.allowed(
      user?.role || 'user',
      this.NAME,
      action,
      AuthPossesion.ANY,
    );
    if (allowed) {
      return {};
    }
    if (!allowed) {
      allowed = this.acl.allowed(
        user?.role || 'user',
        this.NAME,
        action,
        AuthPossesion.OWN,
      );

      const resource = await User.findOne(resourceId);
      if (allowed && user?.id == resource[this.OWNERKEY]) {
        return {};
      }
    }
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

export const findAction = (input: any, resource: string): AuthAction => {
  if (input[resource] != undefined) {
    return AuthAction.CREATE;
  }
  if (input.input != undefined) {
    return AuthAction.UPDATE;
  }
};
