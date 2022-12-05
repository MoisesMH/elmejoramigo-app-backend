import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from 'src/prisma/prisma.service';

const whitelist = ['http://localhost:3000']
const corsOptionsDelegate = function (origin: any, callback: any) {
  const cors = { origin: { } };
  if (whitelist.indexOf(origin) !== -1) {
    cors.origin = true // reflect (enable) the requested origin in the CORS response
  } else {
    cors.origin = false // disable CORS for this request
  }
  callback(null, cors.origin) // callback expects two parameters: error and options
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: corsOptionsDelegate,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'UPDATE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
  // Enable Prisa shutdownHooks, which interfers with Nest one
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)
  await app.listen(5000);
}
bootstrap();
