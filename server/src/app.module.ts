import AdminJS from 'adminjs';
import { GraphQLError } from 'graphql';
import { join } from 'path';

import { AdminModule } from '@adminjs/nestjs';
import {
  Database,
  Resource,
} from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';

import {
  Audio,
  Job,
  Pack,
  Payment,
  Paymentplan,
  Rave,
  Review,
  User,
} from './_entities';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ResolverModule } from './resolver/resolver.module';
import { UploadModule } from './upload/upload.module';

AdminJS.registerAdapter({ Database, Resource });

const ENTITIES = [Audio, Job, Pack, Paymentplan, Payment, Rave, User, Review];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) =>
        ({
          type: 'mysql',
          host: config.get<string>('DB_HOST'),
          database: config.get<string>('DB_NAME'),
          port: config.get<string>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          entities: ENTITIES,
          synchronize: true,
        } as TypeOrmModuleAsyncOptions),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
      introspection: true,
      formatError: (error: GraphQLError) => {
        console.error(error);
        return error;
      },
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
    UploadModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname,'..', 'static'),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
