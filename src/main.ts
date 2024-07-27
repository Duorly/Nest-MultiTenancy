import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3000;
  await app.listen(port);
}

bootstrap().then((value) =>
  console.log(
    `NestJS server is running on http://localhost:${process.env.APP_PORT || 3000}`,
  ),
);
