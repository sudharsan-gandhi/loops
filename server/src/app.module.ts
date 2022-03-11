import AdminJS from 'adminjs';
import { GraphQLError } from 'graphql';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { join } from 'path';
import * as winston from 'winston';

// import { AdminModule } from '@adminjs/nestjs';
import {
  Database,
  Resource,
} from '@adminjs/typeorm';
// import uploadFileFeature from '@adminjs/upload';
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

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ENTITIES } from './entities';
import { ResolverModule } from './resolver/resolver.module';
import { UploadModule } from './upload/upload.module';

AdminJS.registerAdapter({ Database, Resource });

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
    // AdminModule.createAdminAsync({
    //   imports: [UploadModule, AuthModule],
    //   inject: [StorageEngineService, JwtNoauthGuard],
    //   useFactory: (
    //     storage: StorageEngineService,
    //     jwtGuardLoader: JwtNoauthGuard,
    //   ) => {
    //     const RESOURCES_ADMIN: ResourceWithOptions[] = [
    //       { resource: Audio, options: {} },
    //       {
    //         resource: Job,
    //         options: {
    //           properties: {
    //             title: {
    //               type: 'string',
    //               isTitle: true,
    //             },
    //           },
    //           actions: {
    //             new: {
    //               isAccessible: ({ currentAdmin, ...all }) => {
    //                 debugger;
    //                 console.log('all', all);
    //                 console.log('currentadmin', currentAdmin?.role);
    //                 return false;
    //               },
    //             },
    //           },
    //         },
    //       },
    //       { resource: Pack, options: {} },
    //       {
    //         resource: Paymentplan,
    //         options: {
    //           properties: {
    //             isActive: {
    //               type: 'boolean',
    //             },
    //           },
    //         },
    //       },
    //       { resource: Payment, options: {} },
    //       { resource: Rave, options: {} },
    //       {
    //         resource: User,
    //         options: {
    //           properties: {
    //             authorizer: {
    //               // will be always local authorizer
    //               // google and fb not possible
    //               isDisabled: true,
    //             },
    //             image: {
    //               isVisible: false,
    //             },
    //             imageUpload: {
    //               isVisible: {
    //                 list: true,
    //                 show: true,
    //                 edit: true,
    //                 filter: false,
    //               },
    //             },
    //             // imageUpload: {
    //             //   isSortable: false,
    //             //   components: {
    //             //     edit: AdminJS.bundle('../../ui/src/admin/user-avatar'),
    //             //   },
    //             // },
    //           },
    //         },
    //         features: [
    //           uploadFileFeature({
    //             provider: storage,
    //             properties: {
    //               file: 'imageUpload',
    //               key: 'image',
    //               bucket: 'bucket',
    //             },
    //             validation: { mimeTypes: ['image/*'] },
    //           }),
    //         ],
    //       },
    //       { resource: Review, options: {} },
    //     ];
    //     return {
    //       adminJsOptions: {
    //         branding: {
    //           companyName: 'Kabaflow',
    //           softwareBrothers: false,
    //           logo: false,
    //         },
    //         locale: {
    //           language: 'en',
    //           translations: {
    //             messages: {
    //               loginWelcome: 'Admin Dashboard login',
    //             },
    //           },
    //         },
    //         dashboard: {
    //           component: AdminJS.bundle('./admin/ui/home'),
    //           // component: AdminJS.bundle('../../ui/src/admin/dashboard'),
    //         },
    //         rootPath: '/admin',
    //         resources: RESOURCES_ADMIN,
    //       },
    // auth: {
    //   authenticate: async (email, password) => {
    //     try {
    //       return { email: 'admin@gmail.com', roles: ['root'] } as CurrentAdmin;
    //     } catch (err) {
    //       throw new ForbiddenError(err.message);
    //     }
    //   },
    //   cookieName: 'adminjs',
    //   cookiePassword: 'kabaflowadminjs',
    // },
    //     };
    //   },
    // }),
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
