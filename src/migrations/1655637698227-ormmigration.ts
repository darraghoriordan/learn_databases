/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationInterface, QueryRunner } from "typeorm";

export class ormmigration1655637698227 implements MigrationInterface {
  name = "ormmigration1655637698227";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."pet_owner" ADD "address" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."pet_owner" ADD "mobile" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."pet_owner" ADD "homePhone" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."pet_profile" ALTER COLUMN "instagramUrl" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."pet_profile" ALTER COLUMN "instagramUrl" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."pet_owner" DROP COLUMN "homePhone"`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."pet_owner" DROP COLUMN "mobile"`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."pet_owner" DROP COLUMN "address"`
    );
  }
}
