import { PaginationQuery } from './dtos/transaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Get, Post, Query, UseGuards, NotFoundException } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from '@prisma/client';
import { Delete, Param, Put } from '@nestjs/common/decorators';

@UseGuards(AuthGuard('jwt'))
@Controller('api/transaction')
export class TransactionController {
    constructor(private readonly service : TransactionService){}

    @Get()
    async index(@Query() query : PaginationQuery){
        console.log(query)
        return this.service.paginationTransaction(query)
    }

    @Post()
    async store(@Body() dto : Transaction){
        return this.service.createTransaction(dto)
    }

    @Put(":id")
    async update(@Param("id") id :number, @Body() dto : Transaction) : Promise<Object>{
        const find = await this.service.getById(+id)
        if (!find) {
            throw new NotFoundException()
        }
        const data = await this.service.updateTransaction(+id,dto)
        return {
            message : "Data berhasil diupdate",
            data
        }
    }

    @Delete(":id")
    async destroy(@Param("id") id :number) : Promise<Object>{
        const find = this.service.getById(+id)
        if (!find) {
            throw new NotFoundException()
        }
        const data = await this.service.deleteTransaction(+id)
        return {
            message : "Data berhasil dihapus",
            data
        }
    }
}
