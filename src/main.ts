import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('KITUO POS API')
    .setDescription('API Restfull for POS Application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const openApiDoc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, openApiDoc, {
    jsonDocumentUrl: 'docs/json',
  });

  // Port config
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3000;
  await app.listen(port);
}

bootstrap().then(() =>
  console.log(
    `NestJS server is running on http://localhost:${process.env.APP_PORT || 3000}`,
  ),
);
