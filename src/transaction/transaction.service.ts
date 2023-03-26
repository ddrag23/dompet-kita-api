import { Transaction } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginationQuery } from './dtos/transaction.dto';

@Injectable()
export class TransactionService {
    constructor(private readonly prisma: PrismaService) { }

    async paginationTransaction(pq : PaginationQuery): Promise<Object> {
        let start = +pq.skip > 1 ? (+pq.skip * +pq.take) - +pq.take : 0
        const totalData = await this.prisma.transaction.count()
        let pages = Math.ceil(totalData / +pq.take)
        const data = await this.prisma.transaction.findMany({ take: +pq.take, skip: start, orderBy:{
            [pq.sortBy]:pq.sortType
        } })
        const currentPage = (start  / +pq.take) + 1
        return {
            data,
            pages,
            currentPage,
            totalData,
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
