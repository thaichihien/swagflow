import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RabbitMQResponse } from './dto/rabbitmq-response.dto';

import { CustomerProfileFullDto } from 'src/customer/dto/customer-profile-full.dto';
import { Customer } from 'src/customer/enity/customer.enity';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

@Injectable()
export class MessagingService {
  constructor(private readonly authService: AuthService) {}

  async verifyAndGetAccount(
    token: string,
  ): Promise<RabbitMQResponse<CustomerProfileFullDto | UserResponseDto>> {
    const user = await this.authService.verifyUser(token);

    if (user) {
      return {
        success: true,
        message: 'Get account information successfully',
        data: user,
      };
    } else {
      return {
        success: false,
        message: 'invalid token',
        data: null,
      };
    }
  }
}
