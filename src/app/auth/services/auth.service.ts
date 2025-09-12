import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
    constructor (
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser({ email, password }: {
        email: string; 
        password: string
    }): Promise<User | null> {
        const user = await this.userService.findByEmail({ email });

        if (user && await this.userService.validatePassword({plainPassword: password, hashedPassword: user.password})) {
            return user;
        }
        return null;
    }

    async login({ loginDto }: {
        loginDto: LoginDto;
    }) {
        const user = await this.validateUser({email: loginDto.email, password: loginDto.password});
        
        if (!user) {
            throw new UnauthorizedException('Incorrect email or password');
        }

        const payload = {
            email: user.email,
            id: user.user_id,
            role: user.role,
        }

        return {
            acces_token: this.jwtService.sign(payload),
            user
        };
    }

    async register ({ registerDto }: {
        registerDto: RegisterDto;
    }): Promise<User> {
        const existingUser = await this.userService.findByEmail({ email: registerDto.email });

        if (existingUser) {
            throw new UnauthorizedException('User already exist');
        }

        const user = await this.userService.create({ userData: registerDto });
        
        return user;
    }

}