import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './user.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, AuthModule,],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
