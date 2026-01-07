import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletedCreatedByOnLineupAndActionJoinColumnOnDestinationPoint1767801225319 implements MigrationInterface {
    name = 'DeletedCreatedByOnLineupAndActionJoinColumnOnDestinationPoint1767801225319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actions" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "lineups" DROP COLUMN "created_by"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lineups" ADD "created_by" character varying`);
        await queryRunner.query(`ALTER TABLE "actions" ADD "created_by" character varying`);
    }

}
