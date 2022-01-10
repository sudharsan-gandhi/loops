import {
  AuthenticateOptionsGoogle,
  Strategy,
  VerifyCallback,
} from 'passport-google-oauth20';
import {
  Authorizer,
  User,
} from 'src/_entities';

import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService, private auth: AuthService) {
    super({
      clientID: config.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/google/callback',
      successRedirect: 'http://locahost:3001',
      scope: ['profile', 'email'],
      failureRedirect: '/',
    } as AuthenticateOptionsGoogle);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const email = emails[0].value as string;
    let user = await this.auth.findUser(email);
    if (!user) {
      user = await this.auth.saveUser({
        name: name.givenName + ' ' + name.familyName,
        email: emails[0].value as string,
        image: photos[0].value as string,
        emailVerified: emails[0].verified as boolean,
        authorizer: Authorizer.GOOGLE,
      } as User);
    }
    if (user) {
      if (user.authorizer == Authorizer.GOOGLE) {
        return this.auth.signUser(user);
      } else {
        throw new UnauthorizedException(
          `User already registered with ${user.authorizer}`,
        );
      }
    }
    return null;
  }
}
