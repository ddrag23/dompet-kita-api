import { Balance } from '@prisma/client';
import { RequestBalance } from './dtos/balance.dto';
import { BalanceService } from './balance.service';
import { Controller, UseGuards, NotFoundException } from '@nestjs/common';
import { Body, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/balance')
@UseGuards(AuthGuard("jwt"))
export class BalanceController {
    constructor(private readonly service : BalanceService){}

    @Get(":user_id")
    async show(@Param('user_id') user_id : number) : Promise<Balance>{
        const data = await this.service.getBalanceByUserId(+user_id)
        if (data) {
            return data;
            
        }
        throw new NotFoundException()
    }
    @Post()
    async store(@Body() dto : RequestBalance) : Promise<Object>{
        const data = await this.service.createBalance(dto)
        return {
            message : "Data nominal gaji berhasil disimpan",
            data : data
        }
    }

    @Put(":user_id")
    async update(@Param('user_id') user_id : number,@Body() dto : RequestBalance) : Promise<Object>{
        const data = await this.service.updateBalance(+user_id,dto)
        return {
            message : "Data nominal gaji berhasil diupdate",
            data : data
        }
    }

}
