import { Injectable } from '@nestjs/common';
import { CustomerService } from './interfaces/customer.service';
import { CustomerProfileFullDto } from 'src/cart/dto/customer-profile-full.dto';

@Injectable()
export class CustomerHttpClientService extends CustomerService {
  async getCustomerFromToken(token: string): Promise<CustomerProfileFullDto> {
    try {
      const rawResponse = await fetch(
        `http://localhost:3002/api/v1/products?${"queryParam"}`,
      );

      if (!rawResponse.ok) {
      }

      const response: CustomerProfileFullDto = await rawResponse.json();

      return response
    } catch (error) {
      console.log(error);
    }
  }
}
