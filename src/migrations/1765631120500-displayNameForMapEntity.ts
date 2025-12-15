import { MigrationInterface, QueryRunner } from "typeorm";

export class DisplayNameForMapEntity1765631120500 implements MigrationInterface {
    name = 'DisplayNameForMapEntity1765631120500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_51136216a8ef0f392c868decd8"`);
        await queryRunner.query(`ALTER TABLE "maps" RENAME COLUMN "name" TO "displayName"`);
        await queryRunner.query(`ALTER TABLE "maps" RENAME CONSTRAINT "UQ_51136216a8ef0f392c868decd8a" TO "UQ_c69cb2c3c27fc29013d694d7dde"`);
        await queryRunner.query(`CREATE INDEX "IDX_c69cb2c3c27fc29013d694d7dd" ON "maps" ("displayName") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c69cb2c3c27fc29013d694d7dd"`);
        await queryRunner.query(`ALTER TABLE "maps" RENAME CONSTRAINT "UQ_c69cb2c3c27fc29013d694d7dde" TO "UQ_51136216a8ef0f392c868decd8a"`);
        await queryRunner.query(`ALTER TABLE "maps" RENAME COLUMN "displayName" TO "name"`);
        await queryRunner.query(`CREATE INDEX "IDX_51136216a8ef0f392c868decd8" ON "maps" ("name") `);
    }

}
