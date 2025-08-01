import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ROLE } from 'src/app/enums/user/role.enum';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 100 })
  user_firstname: string;

  @Column({ type: 'varchar', length: 100 })
  user_lastname: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reset_password_token: string | null;

  // A voir pour l'enum role et la hiérarchie
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





