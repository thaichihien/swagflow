import { PrismaService } from 'src/prisma/prisma.service';
import { IRepository } from 'src/database/repository.interface';
import { IRoleRepository } from 'src/database/repository-role.interface';
import { Role } from './entities/role.entity';
import { RoleWithUsers } from './entities/role-users';

export class RoleRepository implements IRoleRepository {
  constructor(private prismaService: PrismaService) {}

  async create(dto: any): Promise<Role> {
    const created = await this.prismaService.role.create({
      data: dto,
    });

    return created;
  }
  async findById(id: string): Promise<Role> {
    const one = await this.prismaService.role.findUnique({
      where: {
        id: id,
      },
    });

    return one;
  }
  async findOne(option: any): Promise<any> {
    const one = await this.prismaService.role.findFirst({
      ...option,
    });
    return one;
  }
  async findAll(option?: any): Promise<any> {
    const all = await this.prismaService.role.findMany({
      ...option,
    });
    return all;
  }
  async update(id: string, dto: unknown): Promise<Role> {
    const updated = await this.prismaService.role.update({
      where: {
        id: id,
      },
      data: dto,
    });
    return updated;
  }
  async delete(id: string): Promise<boolean> {
    await this.prismaService.role.delete({
      where: {
        id: id,
      },
    });
    return true;
  }

  async findRoleWithUsers(id: string): Promise<RoleWithUsers> {
    const one = await this.prismaService.role.findFirst({
      where : {
        id : id
      },
      include: {
        users: {
          select: {
            userId: true,
          },
        },
      },
    });
    return one;
  }
  async findRoleByNameWithUsers(name: string): Promise<RoleWithUsers> {
    const one = await this.prismaService.role.findFirst({
      where : {
        name :  name
      },
      include: {
        users: {
          select: {
            userId: true,
          },
        },
      },
    });
    return one;
  }
}
