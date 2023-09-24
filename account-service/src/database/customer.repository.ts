import { Customer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IRepository } from 'src/repository/repository.interface';

export class CustomerRepository implements IRepository<Customer> {
  constructor(private prismaService: PrismaService) {}

  async create(dto: any): Promise<Customer> {
    const created = await this.prismaService.customer.create({
      data: dto,
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
    const one = await this.prismaService.customer.findFirst(option);
    return one;
  }
  async findAll(option?: any): Promise<Customer[]> {
    const all = await this.prismaService.customer.findMany(option);
    return all;
  }
  async update(id: string, dto: Partial<Customer>): Promise<Customer> {
    const updated = await this.prismaService.customer.update({
      where: {
        id: id,
      },
      data: dto,
    });
    return updated;
  }
  async delete(id: string): Promise<boolean> {
    await this.prismaService.customer.delete({
      where: {
        id: id,
      },
    });
    return true;
  }
}
