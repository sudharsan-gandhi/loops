import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import AdminJS from 'adminjs';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ResolverModule } from './resolver/resolver.module';
import {
  Audio,
  Job,
  Pack, Payment, Paymentplan, Rave,
  User
} from './_entities';

AdminJS.registerAdapter({ Database, Resource });


const ENTITIES = [Audio, Job, Pack, Paymentplan, Payment, Rave, User];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      database: 'kabaflow',
      port: 3306,
      username: 'root',
      password: 'Password@123',
      entities: ENTITIES,
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
    }),
    AdminModule.createAdmin({
      adminJsOptions: {
        branding: {
          companyName: 'Kabaflow',
          softwareBrothers: false,
          logo: false,
        },
        rootPath: '/admin',
        resources: [...ENTITIES],
      },
    }),
    ResolverModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
