import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSideEnum1766573460356 implements MigrationInterface {
  name = 'UpdateSideEnum1766573460356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // === LINEUPS TABLE ===

    // 1. Supprimer la valeur par défaut (qui dépend de l'ancien enum)
    await queryRunner.query(
      `ALTER TABLE "lineups" ALTER COLUMN "side" DROP DEFAULT`,
    );

    // 2. Convertir la colonne en VARCHAR
    await queryRunner.query(
      `ALTER TABLE "lineups" ALTER COLUMN "side" TYPE VARCHAR`,
    );

    // 3. Transformer les données existantes
    await queryRunner.query(`
            UPDATE "lineups" SET "side" = CASE 
                WHEN "side" = 'T' THEN 't'
                WHEN "side" = 'CT' THEN 'ct'
                WHEN "side" = 'BOTH' THEN 'Any'
                WHEN "side" = 'Any' THEN 'Any'
                ELSE 'Any'
            END
        `);

    // 4. Supprimer l'ancien enum (maintenant possible car plus de dépendances)
    await queryRunner.query(`DROP TYPE "public"."lineups_side_enum"`);

    // 5. Créer le nouvel enum
    await queryRunner.query(
      `CREATE TYPE "public"."lineups_side_enum" AS ENUM('t', 'ct', 'Any')`,
    );

    // 6. Convertir la colonne vers le nouvel enum
    await queryRunner.query(
      `ALTER TABLE "lineups" ALTER COLUMN "side" TYPE "public"."lineups_side_enum" USING "side"::"public"."lineups_side_enum"`,
    );

    // 7. Remettre la valeur par défaut
    await queryRunner.query(
      `ALTER TABLE "lineups" ALTER COLUMN "side" SET DEFAULT 'Any'`,
    );

    // === ACTIONS TABLE ===

    // Même processus pour actions
    await queryRunner.query(
      `ALTER TABLE "actions" ALTER COLUMN "side" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "actions" ALTER COLUMN "side" TYPE VARCHAR`,
    );

    await queryRunner.query(`
            UPDATE "actions" SET "side" = CASE 
                WHEN "side" = 'T' THEN 't'
                WHEN "side" = 'CT' THEN 'ct'
                WHEN "side" = 'BOTH' THEN 'Any'
                WHEN "side" = 'Any' THEN 'Any'
                ELSE 'Any'
            END
        `);

    await queryRunner.query(`DROP TYPE "public"."actions_side_enum"`);
    await queryRunner.query(
      `CREATE TYPE "public"."actions_side_enum" AS ENUM('t', 'ct', 'Any')`,
    );
    await queryRunner.query(
      `ALTER TABLE "actions" ALTER COLUMN "side" TYPE "public"."actions_side_enum" USING "side"::"public"."actions_side_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "actions" ALTER COLUMN "side" SET DEFAULT 'Any'`,
    );

    // Remettre la FK
    await queryRunner.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'FK_b409ef7c503c9a88eca262a4e12'
        ) THEN
          ALTER TABLE "actions" ADD CONSTRAINT "FK_b409ef7c503c9a88eca262a4e12" 
          FOREIGN KEY ("action_type_id") REFERENCES "action_types"("id") 
          ON DELETE CASCADE ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Processus inverse
    await queryRunner.query(
      `ALTER TABLE "actions" DROP CONSTRAINT IF EXISTS "FK_b409ef7c503c9a88eca262a4e12"`,
    );

    // === ACTIONS ROLLBACK ===
    await queryRunner.query(
      `ALTER TABLE "actions" ALTER COLUMN "side" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "actions" ALTER COLUMN "side" TYPE VARCHAR`,
    );

    await queryRunner.query(`
            UPDATE "actions" SET "side" = CASE 
                WHEN "side" = 't' THEN 'T'
                WHEN "side" = 'ct' THEN 'CT'
                WHEN "side" = 'Any' THEN 'BOTH'
                ELSE 'BOTH'
            END
        `);

    await queryRunner.query(`DROP TYPE "public"."actions_side_enum"`);
    await queryRunner.query(
      `CREATE TYPE "public"."actions_side_enum" AS ENUM('T', 'CT', 'BOTH')`,
    );
    await queryRunner.query(
      `ALTER TABLE "actions" ALTER COLUMN "side" TYPE "public"."actions_side_enum" USING "side"::"public"."actions_side_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "actions" ALTER COLUMN "side" SET DEFAULT 'BOTH'`,
    );

    // === LINEUPS ROLLBACK ===
    await queryRunner.query(
      `ALTER TABLE "lineups" ALTER COLUMN "side" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "lineups" ALTER COLUMN "side" TYPE VARCHAR`,
    );

    await queryRunner.query(`
            UPDATE "lineups" SET "side" = CASE 
                WHEN "side" = 't' THEN 'T'
                WHEN "side" = 'ct' THEN 'CT'
                WHEN "side" = 'Any' THEN 'BOTH'
                ELSE 'BOTH'
            END
        `);

    await queryRunner.query(`DROP TYPE "public"."lineups_side_enum"`);
    await queryRunner.query(
      `CREATE TYPE "public"."lineups_side_enum" AS ENUM('T', 'CT', 'BOTH')`,
    );
    await queryRunner.query(
      `ALTER TABLE "lineups" ALTER COLUMN "side" TYPE "public"."lineups_side_enum" USING "side"::"public"."lineups_side_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lineups" ALTER COLUMN "side" SET DEFAULT 'BOTH'`,
    );
  }
}
