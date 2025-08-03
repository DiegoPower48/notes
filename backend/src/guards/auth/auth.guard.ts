import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  private readonly logger = new Logger(AuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const token = req.cookies?.token;
    if (!token) {
      throw new HttpException(
        'Token not found in cookies',
        HttpStatus.UNAUTHORIZED,
      );
    }
    console.log(this.jwtService);
    console.log(process.env.JWT_SECRET);
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      req['user'] = payload;
      return true;
    } catch (err) {
      this.logger.log('authguard: invalid cookie deleted!');
      res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      });
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
