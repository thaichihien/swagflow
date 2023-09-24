import { Injectable, Logger } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { IDataServices } from 'src/repository/data.service.interface';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name)
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

  async findOneByUsername(username: string, email?: string) {
    let query = {
      where: {
        OR: [],
      },
    };
    query.where.OR.push({
      username: username,
    });
    if (email) {
      query.where.OR.push({
        email: email,
      });
    }

    const one = await this.dataServices.customer.findOne(query);

    return one;
  }

  async findOneByID(id: string) {
    const one = await this.dataServices.customer.findById(id);
    return one;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  async remove(id: string) {
    //this.logger.debug(id)
    await this.dataServices.customer.delete(id)
  }
}
