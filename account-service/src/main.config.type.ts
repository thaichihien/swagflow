import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export interface MainConfig {
  // Swagger configuration
  swaggerConfig?: {
    enable: boolean;
    route: string;
    config: (config: DocumentBuilder) => DocumentBuilder;
    options?: SwaggerCustomOptions;
  };
  corsOptions?: CorsOptions | CorsOptionsDelegate<any>;
  globalPrefix?: string;
  port: number | string;
}
