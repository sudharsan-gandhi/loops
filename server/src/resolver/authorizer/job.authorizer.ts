import { JobInputDTO } from 'src/_dto';
import { Job } from 'src/_entities';
import {
  AccessControlService,
  AuthPossesion,
} from 'src/auth/service/access-control.service';

import { Filter } from '@nestjs-query/core';
import {
  AuthorizationContext,
  CustomAuthorizer,
} from '@nestjs-query/query-graphql';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserContext } from './model';

@Injectable()
export class JobAuthorizer implements CustomAuthorizer<JobInputDTO> {
  NAME = 'job';
  OWNERKEY = 'postedById';

  constructor(protected acl: AccessControlService) {}

  async authorize(
    context: UserContext,
    authorizationContext?: AuthorizationContext,
  ): Promise<Filter<JobInputDTO>> {
    const user = context.req.user;
    const resourceId = context.req?.body?.variables?.input?.id;
    // check first global access
    const action = authorizationContext.operationGroup;
    let allowed = await this.acl.allowed(
      user?.role || 'user',
      this.NAME,
      action,
      AuthPossesion.ANY,
    );
    if (allowed) {
      return {};
    }

    allowed = await this.acl.allowed(user.role, this.NAME, action, AuthPossesion.OWN);
    if (allowed) {
      // if not check if owned resource can be edited
      const resource = await Job.findOne(resourceId);
      const ownerId = resource[this.OWNERKEY];
      if (user[this.OWNERKEY] == ownerId) {
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
