import { CustomerProfileFullDto } from 'src/cart/dto/customer-profile-full.dto';

export abstract class CustomerService {
  abstract getCustomerFromToken(
    token: string,
  ): Promise<CustomerProfileFullDto> | CustomerProfileFullDto;
}
