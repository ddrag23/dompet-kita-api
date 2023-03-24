import { Prisma } from '@prisma/client';
export class PaginationQuery{
    skip : number
    take : number
    sortBy : string
    sortType : Prisma.SortOrder
}