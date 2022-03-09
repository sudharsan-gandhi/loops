import {
  AccessControl,
  Permission,
} from 'accesscontrol';

import { OperationGroup } from '@nestjs-query/query-graphql';
import { Injectable } from '@nestjs/common';

import { grants } from '../config/grants';

@Injectable()
export class AccessControlService {
  private authorizer: AccessControl;

  constructor() {
    this.authorizer = new AccessControl(grants);
  }

  allowed(
    role: string,
    resource: string,
    action: OperationGroup,
    possesion: AuthPossesion,
  ) {
    const method = action + possesion;
    const permission = this.authorizer
      .can(role)
      [method](resource) as Permission;
    return permission.granted;
  }
  
  filter(
    role: string,
    resource: string,
    action: OperationGroup,
    possesion: AuthPossesion,
    data: any,
  ) {
    const method = action + possesion;
    const permission = this.authorizer
      .can(role)
      [method](resource) as Permission;
    return permission.filter(data);
  }
}

export enum AuthAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum AuthPossesion {
  OWN = 'Own',
  ANY = 'Any',
}
