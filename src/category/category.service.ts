import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseCategory, RequestCategory } from './dtos/category.dto';
import { Category } from '@prisma/client';
@Injectable()
export class CategoryService {
    constructor(private prisma : PrismaService){}

    async getAllCategory() : Promise<Category[]>
    {
        return this.prisma.category.findMany()
    }

    async getByIdCategory(id : number) : Promise<Category>{
        try {
            const data = await this.prisma.category.findUnique({where:{id}})
            if (!data) {
                throw new NotFoundException()
            }
            return data
        } catch (error) {
            throw error
        }
    }

    async createCategory(formData : RequestCategory) : Promise<string>{
        try {
            
            await this.prisma.category.create({data: formData})
            return "Data kategori berhasil dimasukkan" 
        } catch (error) {
            throw error
        }
    }

    async updateCategory(id : number,formData:RequestCategory){
        try {
            
            await this.prisma.category.update({where:{id},data: formData})
            return "Data kategori berhasil diupdate" 
        } catch (error) {
            throw error
        }
    }

    async deleteCategory(id : number){
        try {
            
            await this.prisma.category.delete({where:{
                id,
            }})
            return "Data kategori berhasil dihapus" 
        } catch (error) {
            throw error
        }
    }
}
