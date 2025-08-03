import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello(): any {
    return {
      message: 'Hello World!',
      port: process.env.PORT,
      databaseUrl: process.env.DATABASE_URL,
      jwtSecret: process.env.JWT_SECRET,
      jwtTime: process.env.JWT_TIME,
    };
  }
}
