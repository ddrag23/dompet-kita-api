import { Transaction, Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { raw } from '@prisma/client/runtime';
@Injectable()
export class DashboardService {
    constructor(private readonly prisma: PrismaService) { }
    async totalTransactionCurrentMonth(user_id: number) {
        const currentMonth = new Date().getMonth() + 1
        console.log(currentMonth)
        return this.prisma.$queryRaw`select sum(nominal) as total_nominal,user_id from "public"."Transaction" where extract(month from created_at) = ${currentMonth} and user_id = ${user_id} group by user_id`
    }

    async totalByCategory(user_id: number) {
        const category = await this.prisma.category.findMany()
        const currentMonth = new Date().getMonth() + 1
        const ids = category.map((item): number => (item.id));
        
        let summary = []
        for (const id of ids) {
            const summaryTransaction = await this.prisma.$queryRaw`select sum(nominal) as total_nominal,category_id,user_id from "public"."Transaction" where extract(month from created_at) = ${currentMonth} and user_id = ${user_id} and category_id = ${id} group by user_id,category_id`
            summary.push(summaryTransaction[0])
        }

        const result = category.map(item => {
            return {...item, total_nominal : summary.find(i => item.id === i.category_id).total_nominal}
        })

        return result
        
    }
}
