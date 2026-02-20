import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaitlistModule } from './waitlist/waitlist.module';
import { PrismaModule } from './prisma/prisma.module';
import { ContactModule } from './contact/contact.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    // 1. Rate Limiting Configuration
    ThrottlerModule.forRoot([{
      ttl: 60000, // Time to live in milliseconds (60 seconds)
      limit: 10,  // Max number of requests per IP within the TTL
    }]),
    WaitlistModule, 
    PrismaModule, 
    ContactModule, UsersModule, AuthModule, ProfilesModule, DashboardModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 2. Register the Throttler Guard globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}