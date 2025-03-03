import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configIfExist } from './common/helpers/config';
import { mainConfig } from './main.config';

const PORT = process.env.PORT;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(',');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configIfExist(mainConfig.globalPrefix, (prefix) =>
    app.setGlobalPrefix(prefix),
  );

  configIfExist(mainConfig.swaggerConfig, (config) => {
    if (config.enable) {
      const documentBuilder = config.config(new DocumentBuilder()).build();
      const document = SwaggerModule.createDocument(app, documentBuilder);
      SwaggerModule.setup(config.route, app, document, config.options);
    }
  });

  console.log(ALLOWED_ORIGINS);
  app.enableCors({
    allowedHeaders: ['content-type', 'authorization'],
    origin: ALLOWED_ORIGINS,
    credentials: true,
  });
  await app.listen(PORT);
  console.log(`listening at http://localhost:${PORT}`);
}
bootstrap();
