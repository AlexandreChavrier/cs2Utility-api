import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ROLE } from 'src/app/enums/user/role.enum';

export type UserData = {
    userFirstname: string;
    userLastname: string;
    email: string;
    password: string;
    role?: ROLE;
} 


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findByEmail({email}: {
        email: string
    }): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findById({ user_id }: {
        user_id: number;
    }): Promise<User | null> {
        return this.userRepository.findOne({ where: { user_id } })
    }

    async create({ userData }: {
        userData: UserData;
    }): Promise<User> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async validatePassword({ plainPassword, hashedPassword}: {
        plainPassword: string;
        hashedPassword: string;
    }): Promise<Boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}