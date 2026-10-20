import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

import "dotenv/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
await bootstrap();
