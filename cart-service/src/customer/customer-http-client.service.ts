import { Injectable } from '@nestjs/common';
import { CustomerService } from './interfaces/customer.service';
import { CustomerProfileFullDto } from 'src/cart/dto/customer-profile-full.dto';

@Injectable()
export class CustomerHttpClientService extends CustomerService {
  async getCustomerFromToken(token: string): Promise<CustomerProfileFullDto> {
    try {
      const rawResponse = await fetch(
        `http://localhost:3001/api/v1/customers/profile`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const response: CustomerProfileFullDto = await rawResponse.json();

      if (!rawResponse.ok) {
        return null;
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
