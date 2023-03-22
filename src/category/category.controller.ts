import { AuthGuard } from '@nestjs/passport';
import { RequestCategory } from './dtos/category.dto';
import { Category } from '@prisma/client';
import { CategoryService } from './category.service';
import { Body, Controller, Param, Req, UseGuards, Get, Post,Put,Delete } from '@nestjs/common';

@UseGuards(AuthGuard('jwt'))
@Controller('api/category')
export class CategoryController {
    constructor(private readonly service : CategoryService){}
    @Get()
    index(){
        return this.service.getAllCategory()
    }

    @Get(":id")
    show(@Param('id') id: number) : Promise<Category>{
        return this.service.getByIdCategory(+id)
    }

    @Post()
    store(@Body() dto : RequestCategory) : Promise<string>{
        return this.service.createCategory(dto)
    }
    @Put(":id")
    update(@Param('id') id: number, @Body() dto : RequestCategory) : Promise<string>{
        return this.service.updateCategory(+id,dto)
    }
    @Delete(":id")
    delete(@Param('id') id: number) :Promise<string>{
        return this.service.deleteCategory(+id)
    }
}
