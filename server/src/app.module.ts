import AdminJS, { ResourceWithOptions } from 'adminjs';
import { GraphQLError } from 'graphql';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { join } from 'path';
import * as winston from 'winston';

import { AdminModule } from '@adminjs/nestjs';
import {
  Database,
  Resource,
} from '@adminjs/typeorm';
import uploadFileFeature from '@adminjs/upload';
import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
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
import { StorageEngineService } from './upload/services/storage-engine.service';
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
        console.dir(error);
        return error;
      },
    }),
    AdminModule.createAdminAsync({
      imports: [UploadModule],
      inject: [StorageEngineService],
      useFactory: (storage: StorageEngineService) => {
        const RESOURCES_ADMIN: ResourceWithOptions[] = [
          { resource: Audio, options: {} },
          { resource: Job, options: {} },
          { resource: Pack, options: {} },
          {
            resource: Paymentplan,
            options: {
              properties: {
                isActive: {
                  type: 'boolean'
                }
              }
            },
          },
          { resource: Payment, options: {} },
          { resource: Rave, options: {} },
          {
            resource: User,
            options: {
              properties: {
                authorizer: {
                  // will be always local authorizer
                  // google and fb not possible
                  isDisabled: true,
                },
                image: {
                  isVisible: false,
                },
                imageUpload: {
                  isVisible: {
                    list: true,
                    show: true,
                    edit: true,
                    filter: false,
                  },
                },
                // imageUpload: {
                //   isSortable: false,
                //   components: {
                //     edit: AdminJS.bundle('../../ui/src/admin/user-avatar'),
                //   },
                // },
              },
            },
            features: [
              uploadFileFeature({
                provider: storage,
                properties: {
                  file: 'imageUpload',
                  key: 'image',
                  bucket: 'bucket',
                },
                validation: { mimeTypes: ['image/*'] },
              }),
            ],
          },
          { resource: Review, options: {} },
        ];
        return {
          adminJsOptions: {
            branding: {
              companyName: 'Kabaflow',
              softwareBrothers: false,
              logo: false,
            },
            rootPath: '/admin',
            resources: RESOURCES_ADMIN,
          },
        };
      },
    }),
    ResolverModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'dd MMM YY HH:mm:ssZ',
        }),
        winston.format.json(),
        nestWinstonModuleUtilities.format.nestLike('App', {
          prettyPrint: true,
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          dirname: join(__dirname, './../log/debug/'), //path to where save loggin result
          filename: 'debug.log', //name of file where will be saved logging result
          level: 'debug',
        }),
        new winston.transports.File({
          dirname: join(__dirname, './../log/info/'),
          filename: 'info.log',
          level: 'info',
        }),
        new winston.transports.File({
          dirname: join(__dirname, './../log/error/'),
          filename: 'error.log',
          level: 'error',
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
