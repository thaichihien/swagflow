import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IDataServices } from 'src/repository/data.service.interface';
import { IRepository } from 'src/repository/repository.interface';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class PrismaDatabases implements IDataServices, OnApplicationBootstrap {
  constructor(private readonly prismaService: PrismaService) {}
  customer: IRepository<{
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: Date;
    phone: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
  address: IRepository<{
    id: string;
    customerId: string;
    street: string;
    district: string;
    city: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
  onApplicationBootstrap() {
    this.customer = new CustomerRepository(this.prismaService);
  }
}
