import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthorizationObject, ROLES_KEY } from '../decorator/roles.decorator';
import {
  AccessControlService,
  AuthPossesion,
} from '../service/access-control.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    protected reflector: Reflector,
    protected acl: AccessControlService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
    // const authObj = this.reflector.getAllAndOverride<AuthorizationObject>(
    //   ROLES_KEY,
    //   [context.getHandler(), context.getClass()],
    // );
    // const { user, body } = context.switchToHttp().getRequest();
    // let allowed = this.acl.allowed(
    //   user.role,
    //   authObj.resource,
    //   authObj.action,
    //   authObj.possession,
    // );
    // if (
    //   allowed &&
    //   authObj.ownerKey &&
    //   authObj.possession == AuthPossesion.OWN
    // ) {
    //   if (
    //     user[authObj.ownerKey] &&
    //     user[authObj.ownerKey] != body.variables.input.id
    //   ) {
    //     allowed = false;
    //   }
    // }
    // return allowed;
  }
}
