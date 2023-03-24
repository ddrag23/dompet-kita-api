import { Transaction } from './../../node_modules/.prisma/client/index.d';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
    constructor(private readonly prisma : PrismaService){}

    async paginationTransaction(take? : number,skip? : number) : Promise<Object>{
        let page = skip ? 1 : skip
        let start = page > 1 ? (page * take) - take : 0 
        const totalData = await this.prisma.transaction.count()
        let pages = Math.ceil(totalData / take)
        const data = await this.prisma.transaction.findMany({take:take,skip:start})

        return {
            data,
            pages,
        }
    }

    async createTransaction(formData : Transaction){
        return this.prisma.transaction.create({data:formData})
    }

}
