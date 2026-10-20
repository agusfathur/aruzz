import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma/prisma/prisma.service.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private readonly prisma: PrismaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db')
  async testDatabase() {
    await this.prisma.$queryRaw`SELECT 1`;

    return {
      success: true,
      message: 'Database connected',
    };
  }

  @Get('users')
  async testUser()  {
    const user = await this.prisma.users.findMany();

    return {
      statusCode: 200,
      message: 'User found',
      success: true,
      data: user
      };
  }

  @Get('users/create')
  async createUser() {
    const user = await this.prisma.users.create({ data: { name: 'Samuel', email: 'sam@me.com', password: '123456' } });

    return {
      statusCode: 200,
      message: 'User created',
      success: true,
      data: user
    };
  }

  @Get('users/update')
  async updateUser() {
    const user = await this.prisma.users.update({
      where: { id: 1 },
      data: { name: 'James', email: 'some@me.com', password: '1' }
    });

    return {
      statusCode: 200,
      message: 'User created',
      success: true,
      data: user
    };
  }

  // delete
  @Get('users/delete')
  async deleteUser() {
    const user = await this.prisma.users.delete({
      where: { id: 1 }
    });

    return {
      statusCode: 200,
      message: 'User created',
      success: true,
      data: user
    };
  }
}
