import { PrismaService } from './../prisma/prisma.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
@Module({
  imports :[UserModule,PassportModule,JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60s' },
  })],
  providers: [AuthService,UserService,JwtStrategy,JwtService,PrismaService,LocalStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
