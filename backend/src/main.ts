import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  const app = await NestFactory.create(AppModule);

  // 1. SECURITY
  app.use(helmet());

  // 2. PERFORMANCE
  app.use(compression());

  // 3. CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 4. API VERSIONING
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // 5. GLOBAL VALIDATION
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               
      forbidNonWhitelisted: true,    
      transform: true,               
    }),
  );

  // 6. GLOBAL PREFIX
  app.setGlobalPrefix('api');

  // 7. SWAGGER DOCUMENTATION
  const config = new DocumentBuilder()
    .setTitle('Aqwaya API')
    .setDescription('Enterprise API documentation for Aqwaya Waitlist and Core Services')
    .setVersion('1.0')
    .addTag('waitlist')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  
  logger.log(`🚀 Aqwaya Backend is running on: http://localhost:${PORT}/api/v1`);
  logger.log(`📚 API Documentation available at: http://localhost:${PORT}/api/docs`);
}

bootstrap();