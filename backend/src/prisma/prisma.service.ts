import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('❌ DATABASE_URL is not defined in .env');
    }

    // 1. Create a connection pool using the 'pg' driver
    const pool = new Pool({ connectionString });

    // 2. Initialize the Prisma adapter
    const adapter = new PrismaPg(pool);

    // 3. Pass the adapter to the PrismaClient constructor
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Database connected successfully via Prisma 7 Adapter');
    } catch (error: any) {
      console.error('❌ Database connection error:', error.message);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}