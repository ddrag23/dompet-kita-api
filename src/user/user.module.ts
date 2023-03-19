import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService,PrismaService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
