import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ROLE } from 'src/app/enums/user/role.enum';
import { Lineup } from 'src/app/entities/lineup.entity';

export type UserData = {
  user_firstname: string;
  user_lastname: string;
  email: string;
  password: string;
  role?: ROLE;
};

@Injectable()
export class LineupsService {
  constructor(
    @InjectRepository(Lineup)
    private userRepository: Repository<Lineup>,
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
}
