import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '../guards/auth/auth.guard';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(body, res);
  }
  @Post('logout')
  @UseGuards(AuthGuard)
  async Logout(@Res({ passthrough: true }) res: Response) {
    return this.usersService.logout(res);
  }
}
