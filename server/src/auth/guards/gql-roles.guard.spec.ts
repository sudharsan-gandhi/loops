import { GqlRolesGuard } from './gql-roles.guard';

describe('GqlRolesGuard', () => {
  it('should be defined', () => {
    expect(new GqlRolesGuard()).toBeDefined();
  });
});
