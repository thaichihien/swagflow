import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export const QueryRequired = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const value = request.query[key];

    if (value === undefined) {
      throw new BadRequestException(`query param ${key} is required`);
    }

    return value;
  },
);
