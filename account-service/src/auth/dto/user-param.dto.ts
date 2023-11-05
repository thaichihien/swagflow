import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UserParam {
  @IsNotEmpty()
  @IsString()
  @IsIn(['staff', 'admin','customer'])
  user: string;
}
