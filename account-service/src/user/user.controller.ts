import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { HasRoles } from 'src/common/decorators/has-roles.decorator';
import { Role } from 'src/common/constants/role.enum';
import { Request } from 'express';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  
  @HasRoles(Role.Staff, Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get('/profile')
  findProfile(@Req() req: Request) {
    const id = req.user['sub'];
    return this.userService.findUserProfileById(id);
  }

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

 

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // @HasRoles(Role.Admin)
   @UseGuards(AccessTokenGuard)
  @Put('/role/:roleId')
  addRole(@Req() req: Request, @Param('roleId') roleId: string) {
    const id = req.user['sub'];
    return this.userService.addRole(id, roleId);
  }

  @HasRoles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
