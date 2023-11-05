import { User } from 'src/user/entities/user.entity';
import { Role } from './role.entity';

export class RoleWithUsers extends Role {
  users: {
    userId: string;
  }[];
}
