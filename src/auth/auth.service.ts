import { UserService } from 'src/user/user.service';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) { }
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByUsername(username);
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }
    async login(user: any) {
        const payload = { username: user.username,sub: user.id };
        console.log(payload)
        return {
            user : user,
            access_token: this.jwtService.sign(payload,{secret:process.env.JWT_SECRET}),
        };
    }
}