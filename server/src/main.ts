import * as cookieParser from 'cookie-parser';
import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['verbose'],
  });
  app.enableCors({ origin: ['http://localhost:3001', 'https://studio.apollographql.com'], credentials: true });
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'static'), { prefix: '/static' });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
