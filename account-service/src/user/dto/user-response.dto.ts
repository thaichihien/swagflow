import { User } from '../entities/user.entity';

export class UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];

  static convertFromEntity(user: User): UserResponseDto {
    const userResponseDto = new UserResponseDto();
    userResponseDto.id = user.id;
    userResponseDto.email = user.email;
    userResponseDto.firstName = user.firstName;
    userResponseDto.lastName = user.lastName;

    userResponseDto.roles = user.roles.map((role) => role.roleId);
    return userResponseDto;
  }
}
