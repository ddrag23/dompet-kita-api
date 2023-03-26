import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get,  UseGuards, Request } from '@nestjs/common';

@Controller('api/dashboard')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {
    constructor(private readonly service : DashboardService){}

    @Get('total-transaction')
    async totalTransaction(@Request() req) :Promise<any> {
        console.log(new Date())
        return this.service.totalTransactionCurrentMonth(req.user.sub)
    }
}
