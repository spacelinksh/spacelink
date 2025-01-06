import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  app.enableCors();

  await app.listen(3333);

  console.log(`🚀 API is running at localhost:3333`);
}
bootstrap();
