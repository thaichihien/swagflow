import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { mainConfig } from './main.config';
import { configIfExist } from './common/helpers/config';

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

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  configIfExist(mainConfig.corsOptions, (corsOptions) => {
    app.enableCors(corsOptions);
    console.log(
      `Api documentation is available at http://localhost:${mainConfig.port}/api`,
    );
  });

  await app.listen(mainConfig.port);
  console.log(`listening at http://localhost:${mainConfig.port}`);
}
bootstrap();
