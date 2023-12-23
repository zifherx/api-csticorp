import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { initSwagger } from './config/swagger';
import { loggerConfig } from './config/logger';

async function bootstrap() {
  const PORT = process.env.PORT || 3005;
  const app = await NestFactory.create(AppModule, loggerConfig);
  const logger = new Logger(bootstrap.name);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  initSwagger(app);
  await app.listen(PORT);

  logger.log(`Server listening: ${await app.getUrl()}`);
}
bootstrap();
