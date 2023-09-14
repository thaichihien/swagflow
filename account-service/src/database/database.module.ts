import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IDataServices } from 'src/repository/data.service.interface';
import { PrismaDatabases } from './prisma.databases';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IDataServices,
      useClass: PrismaDatabases,
    },
  ],
  exports: [IDataServices],
})
export class DatabaseModule {}
