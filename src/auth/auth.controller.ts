import { Controller,Post,Request,UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req){
        return this.authService.login(req.user)
    }
}
