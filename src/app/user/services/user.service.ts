import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ROLE } from 'src/app/enums/user/role.enum';

export type UserData = {
  user_firstname: string;
  user_lastname: string;
  email: string;
  password: string;
  role?: ROLE;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail({ email }: { email: string }) {
    const userQuery = this.userRepository
      .createQueryBuilder('u')
      .where('u.email = :email', { email });

    const user = await userQuery.getOne();

    return user;
  }

  async findById({ userUuid }: { userUuid: string }) {
    const userQuery = this.userRepository
      .createQueryBuilder('u')
      .where('u.uuid = :userUuid', { userUuid });

    const user = await userQuery.getOne();

    return user;
  }

  async create({ userData }: { userData: UserData }): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async validatePassword({
    plainPassword,
    hashedPassword,
  }: {
    plainPassword: string;
    hashedPassword: string;
  }): Promise<Boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async updateRefreshToken({
    uuid,
    refreshTokenHash,
  }: {
    uuid: string;
    refreshTokenHash: string;
  }) {
    await this.userRepository.update(uuid, {
      refresh_token_hash: refreshTokenHash,
    });
  }

  async updateLastLogin({ userId }: { userId: string }) {
    await this.userRepository.update(userId, {
      last_login_at: new Date(),
    });
  }
}
