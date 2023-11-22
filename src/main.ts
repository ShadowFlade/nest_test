import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost', credentials: true });
  env.config();
  await app.listen(3000);
}
bootstrap();
