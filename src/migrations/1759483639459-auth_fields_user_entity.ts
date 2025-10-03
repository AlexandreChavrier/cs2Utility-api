import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthFieldsUserEntity1759483639459 implements MigrationInterface {
    name = 'AuthFieldsUserEntity1759483639459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "last_login_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token_hash" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_password_token_expiry" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_password_token_expiry"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token_hash"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_login_at"`);
    }

}
