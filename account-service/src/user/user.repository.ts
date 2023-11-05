import { PrismaService } from 'src/prisma/prisma.service';
import { IRepository } from 'src/database/repository.interface';
import { User } from './entities/user.entity';
import { Logger } from '@nestjs/common';

export class UserRepository implements IRepository<User> {
  private readonly logger = new Logger(UserRepository.name);
  constructor(private prismaService: PrismaService) {}

  async create(dto: any): Promise<User> {
    const created = await this.prismaService.user.create({
      data: dto,
      include: {
        roles: {
          select: {
            roleId: true,
          },
        },
      },
    });

    return created;
  }
  async findById(id: string): Promise<User> {
    const one = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      include: {
        roles: {
          select: {
            roleId: true,
          },
        },
      },
    });

    return one;
  }
  async findOne(option: any): Promise<any> {
    const one = await this.prismaService.user.findFirst({
      ...option,
      include: {
        roles: {
          select: {
            roleId: true,
          },
        },
      },
    });
    return one;
  }
  async findAll(option?: any): Promise<any> {
    const all = await this.prismaService.user.findMany({
      ...option,
      include: {
        role: {
          select: {
            roleId: true,
          },
        },
      },
    });
    return all;
  }
  async update(id: string, dto: unknown): Promise<User> {
    const updated = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: dto,
      include: {
        roles: {
          select: {
            roleId: true,
          },
        },
      },
    });
    return updated;
  }
  async delete(id: string): Promise<boolean> {
    await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
    return true;
  }
}
