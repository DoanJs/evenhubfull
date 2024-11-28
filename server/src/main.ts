import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NextFunction } from 'express';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.PATH_ORIGIN,
    credentials: true,
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    next();
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT_SERVER);
  Logger.log(
    `Server is running at http://localhost:${process.env.PORT_SERVER}/graphql`,
    'Js',
  );
}
bootstrap();
