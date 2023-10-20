import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RabbitMQResponse } from './dto/rabbitmq-response.dto';
import { Customer } from '@prisma/client';
import { CustomerProfileFullDto } from 'src/customer/dto/customer-profile-full.dto';

@Injectable()
export class MessagingService {
  constructor(private readonly authService: AuthService) {}

  async verifyAndGetAccount(
    token: string,
  ): Promise<RabbitMQResponse<CustomerProfileFullDto>> {
    const user = await this.authService.verifyUser(token);

    if (user) {
      return {
        success: true,
        message: 'Get account information successfully',
        data: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          dob: user.dob,
          phone: user.phone,
        },
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
