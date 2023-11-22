import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Response,
} from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('add')
  add(@Body() data) {
    return this.UserService.add(data);
  }

  @Post('/delete')
  delete(@Body() data, @Res() response: Response) {
    const isAdded = this.UserService.add(data);
    if (!isAdded) {
      return;
    }
	return response.json()
	
  }
}
