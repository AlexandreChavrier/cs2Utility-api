import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifsOnActionActionTypeLineup1766144606760 implements MigrationInterface {
    name = 'ModifsOnActionActionTypeLineup1766144606760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actions" ADD CONSTRAINT "FK_b409ef7c503c9a88eca262a4e12" FOREIGN KEY ("action_type_id") REFERENCES "action_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actions" DROP CONSTRAINT "FK_b409ef7c503c9a88eca262a4e12"`);
    }

}
