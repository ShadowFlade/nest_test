import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {config as dotenvConfig} from 'dotenv';
dotenvConfig();



const dialect = {
  postgres: 'postgres',
  mysql: 'mysql',
} as const;

export type IDialect = (typeof dialect)[keyof typeof dialect];

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost', credentials: true });
  env.config();
  const config = new DocumentBuilder()
    .setTitle('Catalog')
    .setDescription('Test iBrush api')
    .setVersion('1.0')
    .addTag('tets')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api', app, document);
  const port = process.env.SERVER_PORT || 3000;
  await app.listen(port, () => {
    console.dirxml('opened on port ' + port)
  });
}
bootstrap();
