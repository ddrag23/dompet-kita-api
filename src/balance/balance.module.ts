import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';

@Module({
  providers: [BalanceService,PrismaService],
  controllers: [BalanceController]
})
export class BalanceModule {}
