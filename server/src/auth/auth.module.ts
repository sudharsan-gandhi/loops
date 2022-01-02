import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './strategy/google.strategy';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { GqlRolesGuard } from './guards/gql-roles.guard';
import { GqlJwtGuard } from './guards/gql-jwt.guard';
import { AccessControlService } from './service/access-control.service';

@Module({
  imports: [
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
  exports: [GqlRolesGuard, GqlJwtGuard, AccessControlService],
})
export class AuthModule {}
