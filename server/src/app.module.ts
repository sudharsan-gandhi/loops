import AdminJS, { ResourceWithOptions } from 'adminjs';
import { GraphQLError } from 'graphql';
import { join } from 'path';

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
        console.error(error);
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
          { resource: Paymentplan, options: {} },
          { resource: Payment, options: {} },
          { resource: Rave, options: {} },
          {
            resource: User,
            options: {
              properties: {
                bucket: { isVisible: true },
                authorizer: {
                  // will be always local authorizer
                  // google and fb not possible
                  isDisabled: true,
                },
                image: {
                  isVisible: false,
                },
                imageUpload: {
                  isVisible: { list: true, show: true, edit: true, filter: false },
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
                validation: { mimeTypes: ['image/png'] },
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
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname,'..', 'static'),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
