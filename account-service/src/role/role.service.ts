import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IDataServices } from 'src/database/data.service.interface';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);
  constructor(private readonly dataServices: IDataServices) {}
  async create(createRoleDto: CreateRoleDto) {
    const created = await this.dataServices.role.create(createRoleDto);

    return created;
  }

  async findAll() {
    const all = await this.dataServices.role.findAll();
    return all;
  }

  async findById(id: string) {
    const one = await this.dataServices.role.findById(id);

    if (!one) {
      throw new BadRequestException('Role not found');
    }

    return one;
  }

  async findByName(name: string) {
    const one = await this.dataServices.role.findOne({ where : {
      name : name
    } })

    if (!one) {
      throw new BadRequestException('Role not found');
    }

    return one;
  }

  async findByNameOrCreated(name: string) {
    const one = await this.dataServices.role.findOne({ where : {
      name : name
    } })

    if (!one) {
      const created = await this.dataServices.role.create({ name : name });
      return created;
    }

    return one;
  }

  async findRoleByNameWithUsers(name: string) {
    const one = await this.dataServices.role.findRoleByNameWithUsers(name);

    if (!one) {
      throw new BadRequestException('Role not found');
    }

    return one;
  }


  async update(id: string, updateRoleDto: UpdateRoleDto) {
    await this.findById(id);

    const updated = await this.dataServices.role.update(id, updateRoleDto);
    return updated;
  }

  async remove(id: string) {
    await this.dataServices.role.delete(id);
  }
}
