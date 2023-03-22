import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class ResponseCategory{
    id : number
    category_name : string
    user_id : number
    created_at : Date
    updated_at : Date
}

export class RequestCategory{
    id :number
    @IsNotEmpty()
    @IsString()
    category_name : string
    @IsNotEmpty()
    @IsNumber()
    user_id : number
}