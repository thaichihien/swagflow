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
        .setTitle('Account Service')
        .setDescription(
          'A microservice that manages account information and authentication',
        )
        .setVersion('v1')
        .addTag(
          'Customer',
          'Manages customer information and authentication (Not Finished)',
        )
        .addTag('User', 'Manages user (admin) information and authentication');
    },
  },
  globalPrefix: 'api/v1',
  corsOptions: {
    allowedHeaders: ['content-type', 'authorization'],
    origin: ALLOWED_ORIGINS.split(','),
    credentials: true,
  },
};
