import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(',');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix('/api/v1')
  const config = new DocumentBuilder()
    .setTitle('Cart Service')
    .setDescription('API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(ALLOWED_ORIGINS);
  app.enableCors({
    allowedHeaders: ['content-type','authorization'],
    origin: ALLOWED_ORIGINS,
    credentials: true,
  });
  await app.listen(PORT);
  console.log(`listening at http://localhost:${PORT}`);
}
bootstrap();
