import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { IDataServices } from 'src/repository/data.service.interface';

@Injectable()
export class CustomerService {
  constructor(private readonly dataServices: IDataServices) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const created = await this.dataServices.customer.create(createCustomerDto);

    return created;
  }

  async findAll() {
    const all = await this.dataServices.customer.findAll()
    return all;
  }

  async findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  async remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
