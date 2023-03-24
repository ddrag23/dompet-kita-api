import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('api/transaction')
export class TransactionController {
    constructor(private readonly service : TransactionService){}

    @Get()
    async index(@Query() query){
        console.log(query)
        return this.service.paginationTransaction(+query.take,+query.skip)
    }

    @Post()
    async store(@Body() dto : Transaction){
        return this.service.createTransaction(dto)
    }
}
