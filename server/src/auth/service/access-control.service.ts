import {
  AccessControl,
  Permission,
} from 'accesscontrol';
import { Grant } from 'src/_entities';

import { OperationGroup } from '@nestjs-query/query-graphql';
import {
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class AccessControlService {
  private logger = new Logger();
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
    action: OperationGroup | string,
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
    this.grants = await Grant.find();
    this.logger.log('sql grants', this.grants);
    if (this.authorizer) {
      this.authorizer.setGrants(this.grants);
      this.logger.log('updated grants', this.grants);
    } else {
      this.authorizer = new AccessControl(this.grants);
      this.logger.log('grants initial load complete', this.grants);
    }
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
