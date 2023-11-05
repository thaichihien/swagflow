import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IDataServices } from 'src/database/data.service.interface';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly dataServices: IDataServices) {}
  async create(createUserDto: CreateUserDto) {
    const created = await this.dataServices.user.create(createUserDto);

    return await this.convertToResponse(created);
  }

  async findAll() {
    const all = await this.dataServices.user.findAll();
    return all;
  }

  async findById(id: string) {
    const one = await this.dataServices.user.findById(id);

    if (!one) {
      throw new BadRequestException('User not found');
    }

    return one;
  }

  async findUserRole(id: string) : Promise<string[]> {
    const one = await this.findById(id);

    const roles = await this.dataServices.role.findAll({
      where: {
        id: {
          in: one.roles.map(role => role.roleId),
        },
      },
    });

    return roles.map((role) => role.name);
  }

  async findUserProfileById(id: string) {
    const one = await this.findById(id);

    return await this.convertToResponse(one);
  }

  async findOneByEmail(email: string) {
    const one = await this.dataServices.user.findOne({
      where: {
        email: email,
      },
    });

    if (!one) {
      return null;
    }

    return one
  }

  async saveRefreshToken(id: string, refreshToken: string) {
    const updated = await this.dataServices.user.update(id, {
      refreshToken: refreshToken,
    });
    return updated;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findById(id);

    const updated = await this.dataServices.user.update(id, updateUserDto);
    return updated;
  }

  async addRole(id: string, roleId: string) {
    await this.findById(id);

    const roleUpdated = {
      roles: {
        create: [
          {
            role: {
              connect: { id: roleId },
            },
          },
        ],
      },
    };

    const updated = await this.dataServices.user.update(id, roleUpdated);

    this.logger.debug(updated);
    return updated;
  }

  async remove(id: string) {
    await this.dataServices.user.delete(id);
  }

  async convertToResponse(user: User) {
    const res = UserResponseDto.convertFromEntity(user);
    const roles = await this.dataServices.role.findAll({
      where: {
        id: {
          in: res.roles,
        },
      },
    });

    res.roles = roles.map((role) => role.name);
    return res;
  }

  
}
