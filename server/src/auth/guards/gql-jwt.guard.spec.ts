import { GqlJwtGuard } from './gql-jwt.guard';

describe('GqlJwtGuard', () => {
  it('should be defined', () => {
    expect(new GqlJwtGuard()).toBeDefined();
  });
});
