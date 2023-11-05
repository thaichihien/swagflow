import { Address, Customer } from '@prisma/client';
import { IRepository } from './repository.interface';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { IRoleRepository } from './repository-role.interface';

/**
 * Define all repository here
 */
export abstract class IDataServices {
  abstract customer: IRepository<Customer>;
  abstract address: IRepository<Address>;
  abstract user: IRepository<User>;
  abstract role: IRoleRepository;
}
