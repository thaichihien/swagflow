import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1")
  const config = new DocumentBuilder()
    .setTitle('Backend Nest JS Learning')
    .setDescription('API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser())
  console.log(ALLOWED_ORIGINS);
  app.enableCors({
    allowedHeaders: ['content-type','authorization'],
    origin: ALLOWED_ORIGINS,
    credentials: true,
  })
  await app.listen(PORT);
  console.log(`listening at http://localhost:${PORT}`);
}
bootstrap();
