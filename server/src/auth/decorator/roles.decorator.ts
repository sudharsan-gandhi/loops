import { OperationGroup } from '@nestjs-query/query-graphql';
import { SetMetadata } from '@nestjs/common';
import { AuthPossesion } from '../service/access-control.service';

export const ROLES_KEY = 'roles';

export const Roles = (args: AuthorizationObject) =>
  SetMetadata(ROLES_KEY, args);

export type AuthorizationObject = {
  resource: string;
  possession: AuthPossesion;
  action: OperationGroup;
  ownerKey: string;
};
