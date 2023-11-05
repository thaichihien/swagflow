import { Customer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IRepository } from 'src/database/repository.interface';

export class PrismaRepository<T> implements IRepository<T> {
  constructor(private model : any) {}

  async create(dto: any): Promise<T> {
    const created = await this.model.create({
      data: dto,
    });
    return created;
  }
  async findById(id: string): Promise<T> {
    const one = await this.model.findUnique({
      where: {
        id: id,
      },
    });

    return one;
  }
  async findOne(option: any): Promise<T> {
    const one = await this.model.findFirst(option);
    return one;
  }
  async findAll(option?: any): Promise<T[]> {
    const all = await this.model.findMany(option);
    return all;
  }
  async update(id: string, dto: Partial<T>): Promise<T> {
    const updated = await this.model.update({
      where: {
        id: id,
      },
      data: dto,
    });
    return updated;
  }
  async delete(id: string): Promise<boolean> {
    await this.model.delete({
      where: {
        id: id,
      },
    });
    return true;
  }
}
