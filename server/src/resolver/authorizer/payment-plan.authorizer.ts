import { PaymentplanInputDTO } from 'src/_dto';
import { Paymentplan } from 'src/_entities';
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
export class PaymentPlanAuthorizer
  implements CustomAuthorizer<PaymentplanInputDTO>
{
  NAME = 'paymentplan';
  OWNERKEY = 'postedById';

  constructor(protected acl: AccessControlService) {}

  async authorize(
    context: UserContext,
    authorizationContext?: AuthorizationContext,
  ): Promise<Filter<PaymentplanInputDTO>> {
    const user = context.req.user;
    const resourceId = context.req?.body?.variables?.input?.id;
    // check first global access
    const action = authorizationContext.operationGroup;
    let allowed = this.acl.allowed(
      user?.role || 'guest',
      this.NAME,
      action,
      AuthPossesion.ANY,
    );
    if (allowed) {
      return {};
    }

    allowed = this.acl.allowed(user?.role || 'guest', this.NAME, action, AuthPossesion.OWN);
    if (allowed) {
      // if not check if owned resource can be edited
      const resource = await Paymentplan.findOne(resourceId);
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
