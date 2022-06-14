/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1655195459833 implements MigrationInterface {
  name = "migrations1655195459833";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pet_profile" ("id" SERIAL NOT NULL, "isHouseTrained" boolean NOT NULL, CONSTRAINT "PK_dc9bd94dd249b290f291768433e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "vet" ("id" SERIAL NOT NULL, CONSTRAINT "PK_98679c20fcaf20547fe9cacdf4d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "pet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "owner_id" integer NOT NULL, "profile_id" integer NOT NULL, CONSTRAINT "REL_dc9bd94dd249b290f291768433" UNIQUE ("profile_id"), CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5116a00f46dd9097ed6bd8dd6a" ON "pet" ("owner_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc9bd94dd249b290f291768433" ON "pet" ("profile_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "pet_owner" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5116a00f46dd9097ed6bd8dd6a5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "vet_pet" ("pet_id" integer NOT NULL, "vet_id" integer NOT NULL, CONSTRAINT "PK_8a567c7a011b67c6e745e730169" PRIMARY KEY ("pet_id", "vet_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd80035bec486ae31afc7febfe" ON "vet_pet" ("pet_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0de69f7a567c90e5ebecc1bebd" ON "vet_pet" ("vet_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "pet" ADD CONSTRAINT "FK_5116a00f46dd9097ed6bd8dd6a5" FOREIGN KEY ("owner_id") REFERENCES "pet_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "pet" ADD CONSTRAINT "FK_dc9bd94dd249b290f291768433e" FOREIGN KEY ("profile_id") REFERENCES "pet_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "vet_pet" ADD CONSTRAINT "FK_bd80035bec486ae31afc7febfe5" FOREIGN KEY ("pet_id") REFERENCES "vet"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "vet_pet" ADD CONSTRAINT "FK_0de69f7a567c90e5ebecc1bebd4" FOREIGN KEY ("vet_id") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vet_pet" DROP CONSTRAINT "FK_0de69f7a567c90e5ebecc1bebd4"`
    );
    await queryRunner.query(
      `ALTER TABLE "vet_pet" DROP CONSTRAINT "FK_bd80035bec486ae31afc7febfe5"`
    );
    await queryRunner.query(
      `ALTER TABLE "pet" DROP CONSTRAINT "FK_dc9bd94dd249b290f291768433e"`
    );
    await queryRunner.query(
      `ALTER TABLE "pet" DROP CONSTRAINT "FK_5116a00f46dd9097ed6bd8dd6a5"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0de69f7a567c90e5ebecc1bebd"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bd80035bec486ae31afc7febfe"`
    );
    await queryRunner.query(`DROP TABLE "vet_pet"`);
    await queryRunner.query(`DROP TABLE "pet_owner"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dc9bd94dd249b290f291768433"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5116a00f46dd9097ed6bd8dd6a"`
    );
    await queryRunner.query(`DROP TABLE "pet"`);
    await queryRunner.query(`DROP TABLE "vet"`);
    await queryRunner.query(`DROP TABLE "pet_profile"`);
  }
}
