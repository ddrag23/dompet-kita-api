import { RequestBalance } from './dtos/balance.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Balance } from '@prisma/client';

@Injectable()
export class BalanceService {
    constructor(private prisma : PrismaService) {
        
    }
    async getBalanceByUserId(user_id : number) : Promise<Balance>{
        console.log(user_id)
        return this.prisma.balance.findFirst({where:{
            user_id,
        }})
    }

    async createBalance(formData :RequestBalance){
        return this.prisma.balance.create({data : formData})
    }

    async updateBalance(user_id:number,formData:RequestBalance) {
        return this.prisma.balance.update({where:{user_id},data:formData})
    }

}
