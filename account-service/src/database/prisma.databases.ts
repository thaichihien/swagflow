import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IDataServices } from 'src/repository/data.service.interface';
import { IRepository } from 'src/repository/repository.interface';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class PrismaDatabases implements IDataServices, OnApplicationBootstrap {
  customer: IRepository<{
    id: string;
    username: string;
    email: string;
    password: string;
    fullname: string;
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

  constructor(private readonly prismaService: PrismaService) {}
  onApplicationBootstrap() {
    console.log("onApplicationBootstrap");
    //console.log(this.prismaService); 
    this.customer = new CustomerRepository(this.prismaService);
  }
}
