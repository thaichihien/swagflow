import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT;

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

  app.enableCors({
    allowedHeaders: ['content-type','authorization'],
    origin: 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(PORT);
  console.log(`listening at http://localhost:${PORT}`);
}
bootstrap();
