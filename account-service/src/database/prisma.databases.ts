import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IDataServices } from 'src/database/data.service.interface';
import { IRepository } from 'src/database/repository.interface';
import { CustomerRepository } from '../customer/customer.repository';
import { Address, Customer, Role } from '@prisma/client';
import { UserRepository } from 'src/user/user.repository';
import { PrismaRepository } from 'src/repository/prisma.repository';
import { User } from 'src/user/entities/user.entity';
import { RoleRepository } from 'src/role/role.repository';
import { IRoleRepository } from './repository-role.interface';

@Injectable()
export class PrismaDatabases implements IDataServices, OnApplicationBootstrap {
  constructor(private readonly prismaService: PrismaService) {}
  role: IRoleRepository;
  user: IRepository<User>;
  customer: IRepository<Customer>;
  address: IRepository<Address>;
  onApplicationBootstrap() {
    this.customer = new CustomerRepository(this.prismaService);
    this.user = new UserRepository(this.prismaService);
    this.role = new RoleRepository(this.prismaService);
  }
}
