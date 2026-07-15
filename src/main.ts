import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log("1 starting bootstrap");
  const app = await NestFactory.create(AppModule);
  console.log("2 Nestfactory created the app");
  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  console.log("3 checking for open port");
  await app.listen(process.env.PORT ?? 4000);

  console.log(`4 Running on port ${process.env.PORT}`);
}
bootstrap();
