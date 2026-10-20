import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  constructor() {
    const adapter  = new PrismaPg({
        connectionString: process.env.DATABASE_URL
    });
    super({ adapter });
    console.info('PrismaService initialized');
  }

  async onModuleInit() {
    await this.$connect();
    console.info('PrismaService connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.info('PrismaService disconnected');
  }
}
