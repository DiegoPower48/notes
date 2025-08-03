import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginUserDto, res: Response) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    const jwtTimeInDays = Number(process.env.JWT_TIME || 1);
    const maxAge = jwtTimeInDays * 24 * 60 * 60 * 1000;

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge,
    });

    return { message: 'Authenticated' };
  }

  async logout(res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return { message: 'Logout' };
  }
}
