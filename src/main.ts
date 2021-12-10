import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/HttpExceptionFilter.';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/mita');

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }
  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port;

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
