import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Use environment variables for production flexibility
  const PORT = process.env.PORT || 5000;
  const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;
  const WS_URL = process.env.WS_URL || `ws://localhost:${PORT}`;

  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "unsafe-none" }
  }));

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.use(compression());

  const origins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:3000'];

  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
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
    .setTitle('Aqwaya API & Real-Time Engine')
    .addServer(APP_URL, 'Current Environment') // This allows "Try it out" to work in Production
    .setDescription(
      '## 🛡️ Authentication\n' +
      'Protected endpoints require a JWT. Click **Authorize**, enter: `Bearer <token>`\n\n' +
      '## 💬 Real-Time Chat (WebSockets)\n' +
      `The chat engine uses **Socket.io**. Connect to: \`${WS_URL}\` (Use JWT in auth header).\n\n` +
      '### **Outgoing Events**\n' +
      '- `getHistory`: `{ "campaignId": "string" }` - Requests past messages.\n' +
      '- `sendMessage`: `{ "campaignId": "string", "content": "string", "action"?: { "type": "string", "value": "any" } }` - Sends a new message or button click.\n\n' +
      '### **Incoming Events**\n' +
      '- `chatHistory`: `Array<ChatMessage>` - Returns history for rehydration.\n' +
      '- `aiResponse`: `{ "text": "string", "suggestions": Array<Suggestion> }` - The AI response.'
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .addTag('Auth')
    .addTag('Campaigns')
    .addTag('Profiles')
    .addTag('Dashboard')
    .addTag('Users')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: true,
    swaggerOptions: {
      persistAuthorization: true,
      filter: true,
    }
  });

  await app.listen(PORT);
  logger.log(`🚀 Aqwaya Backend is running on: ${APP_URL}/api/v1`);
}

bootstrap();