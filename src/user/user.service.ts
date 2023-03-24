import { UsersDto, ReqUserDto, UpdateUserDto } from './user.dto';
import {User} from '@prisma/client'
import { PrismaService } from './../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(private prisma : PrismaService){}

    async getAll():Promise<UsersDto[]>{
        const users = await this.prisma.user.findMany({
            select:{
                id : true,
                username : true,
                name : true,
                created_at : true,
                updated_at : true,
            }
        })
        return users.map((item) :UsersDto => {
            return {
                id : item.id,
                username : item.username,
                name : item.name,
                created_at : item.created_at,
                updated_at : item.updated_at,
            }
        })
    }

    async getUser(id : number):Promise<User | null>{
        
        return this.prisma.user.findUnique({where:{id}})
    }

    async getUserWithBalance(id : number): Promise<User | null>{
        return this.prisma.user.findUnique({where:{id},include:{
            balance:true
        }})
    }

    async getUserByUsername(username:string){
        return this.prisma.user.findUnique({where:{username}})

    }

    async create({username,password,name} : ReqUserDto) : Promise<User>{
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password,salt)
        return this.prisma.user.create({
            data : {
                username,
                name,
                password: hash
            },
          });
    }

    async updateUser(id: number,{username,password,name}:UpdateUserDto): Promise<User> {
        const find = await this.getUser(+id)
        try {
            if (!find) {
                throw new HttpException("data not found",HttpStatus.NOT_FOUND)
            }
            let hash;
            if (password) {
                const salt = await bcrypt.genSalt()
                hash = await bcrypt.hash(password,salt)
            }else{
                hash = find.password
            }
            return this.prisma.user.update({
              where: { id: Number(id) },
              data : {
                username,
                name,
                password: hash
            },
            });
        } catch (error) {
            throw error
        }
      }
      async deleteUser(id: number): Promise<User> {
        return this.prisma.user.delete({
          where: { id: Number(id) },
        });
    }
}
