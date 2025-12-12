import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ROLE } from 'src/app/enums/user/role.enum';
import { Exclude, Expose } from 'class-transformer';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 100 })
  user_firstname: string;

  @Column({ type: 'varchar', length: 100 })
  user_lastname: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_login_at: Date | null;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  refresh_token_hash: string | null;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  reset_password_token: string | null;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  reset_password_token_expiry: Date | null;

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

  // Hook pour nettoyer les données sensibles avant insertion/update
  @BeforeInsert()
  @BeforeUpdate()
  cleanupExpiredTokens() {
    // Nettoyer le token de reset si expiré
    if (
      this.reset_password_token_expiry &&
      this.reset_password_token_expiry < new Date()
    ) {
      this.reset_password_token = null;
      this.reset_password_token_expiry = null;
    }
    // // Nettoyer le token de vérification email si expiré
    // if (this.email_verification_token_expiry && this.email_verification_token_expiry < new Date()) {
    //   this.email_verification_token = null;
    //   this.email_verification_token_expiry = null;
    // }
  }
  // ===== MÉTHODES UTILITAIRES =====

  async comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }
}
