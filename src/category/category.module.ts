import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  providers: [CategoryService,PrismaService],
  controllers: [CategoryController]
})
export class CategoryModule {}
