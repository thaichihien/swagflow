import { MainConfig } from './main.config.type';

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;

export const mainConfig: MainConfig = {
  port: PORT,
  swaggerConfig: {
    enable: true,
    route: 'api',
    config(config) {
      return config
        .setTitle('Cart Service')
        .setDescription('A microservice that manages information about cargo')
        .setVersion('v1');
    },
  },
  //globalPrefix: 'api/v1',
  corsOptions: {
    allowedHeaders: ['content-type', 'authorization'],
    origin: ALLOWED_ORIGINS,
    credentials: true,
  },
};
