import { UserController } from './user/user.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [UserModule, AuthModule, CategoryModule, BalanceModule,],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
