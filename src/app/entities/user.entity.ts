import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ROLE } from 'src/app/enums/user/role.enum';
import { Exclude, Expose } from 'class-transformer';
@Entity('users')
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  user_id: number;

  @Expose({ groups: ['profile', 'admin'] })
  @Column({ type: 'varchar', length: 100 })
  user_firstname: string;

  @Expose({ groups: ['profile', 'admin'] })
  @Column({ type: 'varchar', length: 100 })
  user_lastname: string;

  @Expose({ groups: ['profile', 'auth', 'admin'] })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Expose({ groups: ['admin'] })
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  reset_password_token: string | null;

  @Expose({ groups: ['profile', 'admin'] })
  @Column({ type: 'enum', enum: ROLE, default: ROLE.ROLE_USER })
  role: ROLE;
  
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }
}





