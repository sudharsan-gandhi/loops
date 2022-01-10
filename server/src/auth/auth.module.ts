import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { GqlJwtGuard } from './guards/gql-jwt.guard';
import { GqlRolesGuard } from './guards/gql-roles.guard';
import { AccessControlService } from './service/access-control.service';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
    GoogleStrategy,
    FacebookStrategy,
    GqlJwtGuard,
    GqlRolesGuard,
    AccessControlService,
  ],
  exports: [GqlRolesGuard, GqlJwtGuard, AccessControlService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
