import {
  AccessControl,
  Permission,
} from 'accesscontrol';
import { Grant } from 'src/_entities';

import { OperationGroup } from '@nestjs-query/query-graphql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessControlService {
  private authorizer: AccessControl;
  grants: Grant[];

  constructor() {}

  async init() {
    if (!this.grants || !this.authorizer) {
      await this.reload();
    }
  }

  async allowed(
    role: string,
    resource: string,
    action: OperationGroup,
    possesion: AuthPossesion,
  ) {
    await this.init();
    const method = action + possesion;
    const permission = this.authorizer
      .can(role)
      [method](resource) as Permission;
    return permission.granted;
  }

  async filter(
    role: string,
    resource: string,
    action: OperationGroup,
    possesion: AuthPossesion,
    data: any,
  ) {
    await this.init();
    const method = action + possesion;
    const permission = this.authorizer
      .can(role)
      [method](resource) as Permission;
    return permission.filter(data);
  }

  async reload() {
    this.grants = await Grant.find({});
    this.authorizer = new AccessControl(this.grants);
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
