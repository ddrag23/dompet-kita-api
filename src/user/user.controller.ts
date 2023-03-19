import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators';
import { UsersDto, ReqUserDto, UpdateUserDto } from './user.dto';
import { User } from '@prisma/client';
import { Controller,Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    HttpException,
    HttpStatus, } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('api/user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private readonly service: UserService) {}
  @Get()
  async getAllTodo(): Promise<UsersDto[]> {
    return this.service.getAll();
  }
  @Post()
  async createUser(@Body() postData: ReqUserDto): Promise<User> {
    return this.service.create(postData);
  }
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User | null> {
    const find = await this.service.getUser(+id)
    if (!find) {
        throw new HttpException("Data not found",HttpStatus.NOT_FOUND)
    }
    return find;
  }
  @Put(':id')
  async Update(@Param('id') id: number,@Body()postData: UpdateUserDto): Promise<string> {
    await this.service.updateUser(id,postData);
    return "Data was success updated"
  }
  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<User | string> {
    const find = await this.service.getUser(+id)
    if (!find) {
        throw new HttpException("Data not found",HttpStatus.NOT_FOUND)
    }
    return this.service.deleteUser(+id);
  }
}
