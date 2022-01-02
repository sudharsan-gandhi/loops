import { Injectable } from '@nestjs/common';
import { AccessControl, Permission } from 'accesscontrol';
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
    action: AuthAction,
    possesion: AuthPossesion,
  ) {
    const method = action + possesion;
    const permission = this.authorizer
      .can(role)
      [method](resource) as Permission;
    return permission.granted;
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
