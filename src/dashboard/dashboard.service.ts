import { Transaction, Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class DashboardService {
    constructor(private readonly prisma:PrismaService){}
    async totalTransactionCurrentMonth(user_id : number) {
        const currentMonth = new Date().getMonth() + 1
        console.log(currentMonth)
        return this.prisma.$queryRaw`select sum(nominal) as total_nominal,user_id from "public"."Transaction" where extract(month from created_at) = ${currentMonth} and user_id = ${user_id} group by user_id`
    }
}
