import { MigrationInterface, QueryRunner } from "typeorm";

export class NewColumnIconUrlInLineup1766738342690 implements MigrationInterface {
    name = 'NewColumnIconUrlInLineup1766738342690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lineups" ADD "icon_url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lineups" DROP COLUMN "icon_url"`);
    }

}
