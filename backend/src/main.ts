import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());

  const origins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:3000'];

  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               
      forbidNonWhitelisted: true,    
      transform: true,               
    }),
  );

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Aqwaya API')
    .setDescription('Enterprise API documentation for Aqwaya Waitlist and Core Services')
    .setVersion('1.0')
    .addTag('waitlist')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: true, 
  });

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  
  logger.log(`🚀 Aqwaya Backend is running on: http://localhost:${PORT}/api/v1`);
  logger.log(`📚 API Documentation available at: http://localhost:${PORT}/api/docs`);
}

bootstrap();