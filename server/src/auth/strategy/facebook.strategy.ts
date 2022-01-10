import {
  Strategy,
  StrategyOption,
  VerifyFunction,
} from 'passport-facebook';
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
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService, private auth: AuthService) {
    super({
      clientID: config.get<string>('FB_CLIENT_ID'),
      clientSecret: config.get<string>('FB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      scope: ['email'],
      profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
    } as StrategyOption);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyFunction,
  ): Promise<any> {
    console.log(profile);
    const { displayName, emails, photos } = profile;
    const email = emails[0].value as string;
    let user = await this.auth.findUser(email);
    if (!user) {
      user = await this.auth.saveUser({
        name: displayName,
        email: emails[0].value as string,
        image: photos[0].value as string,
        emailVerified: emails[0].verified as boolean,
        authorizer: Authorizer.FACEBOOK,
      } as User);
    }
    if (user) {
      if (user.authorizer == Authorizer.FACEBOOK) {
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
