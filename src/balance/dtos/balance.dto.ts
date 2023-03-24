import { IsNotEmpty, IsNumber } from 'class-validator';
export class RequestBalance{
    @IsNotEmpty()
    user_id : number
    @IsNotEmpty()
    @IsNumber()
    nominal : number
}