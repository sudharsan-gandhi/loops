import { JwtNoauthGuard } from './jwt-noauth.guard';

describe('JwtNoauthGuard', () => {
  it('should be defined', () => {
    expect(new JwtNoauthGuard()).toBeDefined();
  });
});
