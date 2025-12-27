import { MigrationInterface, QueryRunner } from "typeorm";

export class NewIntermediatePointsColumnOnLineup1766846746105 implements MigrationInterface {
    name = 'NewIntermediatePointsColumnOnLineup1766846746105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lineups" ADD "intermediate_points" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lineups" DROP COLUMN "intermediate_points"`);
    }

}
