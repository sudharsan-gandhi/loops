import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AccessControlService } from '../service/access-control.service';
import { RolesGuard } from './roles.guard';

@Injectable()
export class GqlRolesGuard extends RolesGuard {
  constructor(
    protected reflector: Reflector,
    protected acl: AccessControlService,
  ) {
    super(reflector, acl);
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
