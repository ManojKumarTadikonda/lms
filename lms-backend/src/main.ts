import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: true, // reflect request origin
  });

  // --- Swagger Configuration ---
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Library Management API')
    .setDescription('API documentation for the Library Management System')
    .setVersion('1.0')
    .addBearerAuth() // Enables JWT auth button in Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);
  // Swagger URL → http://localhost:3000/api-docs

  await app.listen(3000);
}

bootstrap();
