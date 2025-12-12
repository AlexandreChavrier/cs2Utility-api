import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNamesFromXAndFromYColumns1766575233168 implements MigrationInterface {
    name = 'UpdateNamesFromXAndFromYColumns1766575233168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actions" DROP COLUMN "throw_from_x"`);
        await queryRunner.query(`ALTER TABLE "actions" DROP COLUMN "throw_from_y"`);
        await queryRunner.query(`ALTER TABLE "actions" ADD "from_x" numeric(5,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actions" ADD "from_y" numeric(5,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actions" DROP COLUMN "from_y"`);
        await queryRunner.query(`ALTER TABLE "actions" DROP COLUMN "from_x"`);
        await queryRunner.query(`ALTER TABLE "actions" ADD "throw_from_y" numeric(5,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actions" ADD "throw_from_x" numeric(5,2) NOT NULL`);
    }

}
