import { Body, Controller, Post, Res, Response } from '@nestjs/common';
import { UserService } from './user.service.js';
import { ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import { createUserDto } from './dto/create-user.dto.js';
import { User } from './models/user.model.js';
import { userDto } from './dto/user.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('add')
  @ApiResponse({ type: userDto, status: 201 })
  @ApiResponse({ status: 422, description: 'COULD NOT CREATE THE ELEMENT' })
  add(@Body() UserDto : createUserDto): Promise<createUserDto | false> {
    return this.UserService.add(UserDto);
  }
}
