import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from './dto/create.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('register')
  async register(@Body() createDto: UserDto) {
    return this.userService.create(createDto);
  }
}
