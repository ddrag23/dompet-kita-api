import { Transaction } from './../../node_modules/.prisma/client/index.d';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
    constructor(private readonly prisma: PrismaService) { }

    async paginationTransaction(take?: number, skip?: number): Promise<Object> {
        let page = skip ? 1 : skip
        let start = page > 1 ? (page * take) - take : 0
        const totalData = await this.prisma.transaction.count()
        let pages = Math.ceil(totalData / take)
        const data = await this.prisma.transaction.findMany({ take: take, skip: start })

        return {
            data,
            pages,
        }
    }

    async getById(id:number) : Promise<Transaction>{
        return this.prisma.transaction.findUnique({where:{id}})
    }

    async getByUserId(user_id: number): Promise<Transaction> {
        return this.prisma.transaction.findFirst({ where: { user_id } })
    }

    async createTransaction(formData: Transaction) : Promise<Transaction>{
        return this.prisma.transaction.create({ data: formData })
    }

    async updateTransaction(id:number,formData : Transaction): Promise<Transaction>{
        return this.prisma.transaction.update({where:{id},data:formData})
    }

    async deleteTransaction(id:number): Promise<Transaction>{
        return this.prisma.transaction.delete({where:{id}})
    }


}
