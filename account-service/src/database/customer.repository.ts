import { Customer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IRepository } from 'src/repository/repository.interface';

export class CustomerRepository implements IRepository<Customer> {
  constructor(private prismaService: PrismaService) {}

  async create(dto: any): Promise<Customer> {
    //console.log(this.prismaService)
    const created = await this.prismaService.customer.create({
        data : dto
    });
    return created;
  }
  async findById(id: string): Promise<Customer> {
    const one = await this.prismaService.customer.findUnique({
      where: {
        id: id,
      },
    });

    return one;
  }
  async findOne(option: any): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
  async findAll(option?: any): Promise<Customer[]> {
    const all = await this.prismaService.customer.findMany(option);
    return all;
  }
  async update(id: string, dto: Partial<Customer>): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
