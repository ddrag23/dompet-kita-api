import { IsNotEmpty } from "class-validator";

export interface UsersDto{
    id:  number
    name : string
    username : string
    created_at : Date
    updated_at : Date

}

export class ReqUserDto{
    @IsNotEmpty()
    name : string
    @IsNotEmpty()
    username : string
    @IsNotEmpty()
    password : string
}

export class UpdateUserDto{
    @IsNotEmpty()
    name : string
    @IsNotEmpty()
    username : string
    password? : string
}