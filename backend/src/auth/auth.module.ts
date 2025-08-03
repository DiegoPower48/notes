import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

const days = Number(process.env.JWT_TIME);
const expiresIn = days ? `${days}d` : '1d';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
