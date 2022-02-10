import * as cookieParser from 'cookie-parser';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['verbose'],
  });
  const whitelist = [
    'http://localhost:3001',
    'https://studio.apollographql.com',
  ];
  app.enableCors({
    origin: whitelist,
    credentials: true,
  });
  app.use(cookieParser());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useStaticAssets(join('static'), { prefix: '/static' });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
