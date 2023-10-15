import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { IDataServices } from 'src/repository/data.service.interface';
import { CustomerProfileDto } from './dto/customer-profile.dto';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);
  constructor(private readonly dataServices: IDataServices) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const created = await this.dataServices.customer.create(createCustomerDto);

    return created;
  }

  async saveRefreshToken(id: string, refreshToken: string) {
    const updated = await this.dataServices.customer.update(id, {
      refreshToken: refreshToken,
    });
    return updated;
  }

  async findAll() {
    const all = await this.dataServices.customer.findAll();
    return all;
  }

  async findOneByEmail(email: string) {
    const one = await this.dataServices.customer.findOne({
      where: {
        email: email,
      },
    });

    return one;
  }

  async findCustomerProfile(id: string): Promise<CustomerProfileDto> {
    const customer = await this.findOneByID(id);

    const profile: CustomerProfileDto = {
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dob: customer.dob,
      phone: customer.phone,
    };

    return profile;
  }

  async findOneByID(id: string) {
    const one = await this.dataServices.customer.findById(id);

    if (!one) {
      throw new NotFoundException('the customer pro');
    }
    return one;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  async remove(id: string) {
    //this.logger.debug(id)
    await this.dataServices.customer.delete(id);
  }
}
