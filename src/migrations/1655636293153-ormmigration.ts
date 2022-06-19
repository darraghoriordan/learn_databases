import { MigrationInterface, QueryRunner } from "typeorm";

// eslint-disable-next-line @typescript-eslint/naming-convention
export class ormmigration1655636293153 implements MigrationInterface {
  name = "ormmigration1655636293153";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "walkingapp"."emergency_contact" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "mobilePhone" character varying NOT NULL, "homePhone" character varying NOT NULL, "typeOfContact" character varying NOT NULL, CONSTRAINT "PK_922933ddef34a7e1ed99ae692ce" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "walkingapp"."pet_profile" ("id" SERIAL NOT NULL, "isHouseTrained" boolean NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "breed" character varying NOT NULL, "instagramUrl" character varying NOT NULL, CONSTRAINT "PK_dc9bd94dd249b290f291768433e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "walkingapp"."walker_profile" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "mobilePhone" character varying NOT NULL, "homePhone" character varying NOT NULL, CONSTRAINT "PK_3b1c8860919d0efbb8ae12e99f6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "walkingapp"."walking_appointment" ("id" SERIAL NOT NULL, "startAt" TIMESTAMP WITH TIME ZONE NOT NULL, "endAt" TIMESTAMP WITH TIME ZONE NOT NULL, "petId" integer NOT NULL, "walkerProfileId" integer NOT NULL, CONSTRAINT "PK_fc43a0752ca298d983d718e662d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c016847d83edd08ca8f9e22bbf" ON "walkingapp"."walking_appointment" ("startAt") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4d6da7cc3782fbf51b282328c0" ON "walkingapp"."walking_appointment" ("endAt") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ee70e647115a09295d04601d00" ON "walkingapp"."walking_appointment" ("petId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_709cd8ec21faefa30b6df3d96a" ON "walkingapp"."walking_appointment" ("walkerProfileId") `
    );
    await queryRunner.query(
      `CREATE TABLE "walkingapp"."pet" ("id" SERIAL NOT NULL, "ownerId" integer NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "REL_80541d3b7fe3395927d1e894ab" UNIQUE ("profileId"), CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_20acc45f799c122ec3735a3b8b" ON "walkingapp"."pet" ("ownerId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_80541d3b7fe3395927d1e894ab" ON "walkingapp"."pet" ("profileId") `
    );
    await queryRunner.query(
      `CREATE TABLE "walkingapp"."pet_owner" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5116a00f46dd9097ed6bd8dd6a5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "walkingapp"."pet_l3" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "ownerName" character varying NOT NULL, CONSTRAINT "PK_a9795cde8d18e656a10f4e3ea07" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "walkingapp"."emergency_contact_pet" ("petId" integer NOT NULL, "vetId" integer NOT NULL, CONSTRAINT "PK_62b720a72c817fb623487169db9" PRIMARY KEY ("petId", "vetId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_81ed3e576e4c1fa221b1360cd4" ON "walkingapp"."emergency_contact_pet" ("petId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8bc0aa21fac7940b2c50d87201" ON "walkingapp"."emergency_contact_pet" ("vetId") `
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."walking_appointment" ADD CONSTRAINT "FK_ee70e647115a09295d04601d000" FOREIGN KEY ("petId") REFERENCES "walkingapp"."pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."walking_appointment" ADD CONSTRAINT "FK_709cd8ec21faefa30b6df3d96a5" FOREIGN KEY ("walkerProfileId") REFERENCES "walkingapp"."walker_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."pet" ADD CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1" FOREIGN KEY ("ownerId") REFERENCES "walkingapp"."pet_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."pet" ADD CONSTRAINT "FK_80541d3b7fe3395927d1e894abc" FOREIGN KEY ("profileId") REFERENCES "walkingapp"."pet_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."emergency_contact_pet" ADD CONSTRAINT "FK_81ed3e576e4c1fa221b1360cd47" FOREIGN KEY ("petId") REFERENCES "walkingapp"."emergency_contact"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."emergency_contact_pet" ADD CONSTRAINT "FK_8bc0aa21fac7940b2c50d87201e" FOREIGN KEY ("vetId") REFERENCES "walkingapp"."pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."emergency_contact_pet" DROP CONSTRAINT "FK_8bc0aa21fac7940b2c50d87201e"`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."emergency_contact_pet" DROP CONSTRAINT "FK_81ed3e576e4c1fa221b1360cd47"`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."pet" DROP CONSTRAINT "FK_80541d3b7fe3395927d1e894abc"`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."pet" DROP CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1"`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."walking_appointment" DROP CONSTRAINT "FK_709cd8ec21faefa30b6df3d96a5"`
    );
    await queryRunner.query(
      `ALTER TABLE "walkingapp"."walking_appointment" DROP CONSTRAINT "FK_ee70e647115a09295d04601d000"`
    );
    await queryRunner.query(
      `DROP INDEX "walkingapp"."IDX_8bc0aa21fac7940b2c50d87201"`
    );
    await queryRunner.query(
      `DROP INDEX "walkingapp"."IDX_81ed3e576e4c1fa221b1360cd4"`
    );
    await queryRunner.query(`DROP TABLE "walkingapp"."emergency_contact_pet"`);
    await queryRunner.query(`DROP TABLE "walkingapp"."pet_l3"`);
    await queryRunner.query(`DROP TABLE "walkingapp"."pet_owner"`);
    await queryRunner.query(
      `DROP INDEX "walkingapp"."IDX_80541d3b7fe3395927d1e894ab"`
    );
    await queryRunner.query(
      `DROP INDEX "walkingapp"."IDX_20acc45f799c122ec3735a3b8b"`
    );
    await queryRunner.query(`DROP TABLE "walkingapp"."pet"`);
    await queryRunner.query(
      `DROP INDEX "walkingapp"."IDX_709cd8ec21faefa30b6df3d96a"`
    );
    await queryRunner.query(
      `DROP INDEX "walkingapp"."IDX_ee70e647115a09295d04601d00"`
    );
    await queryRunner.query(
      `DROP INDEX "walkingapp"."IDX_4d6da7cc3782fbf51b282328c0"`
    );
    await queryRunner.query(
      `DROP INDEX "walkingapp"."IDX_c016847d83edd08ca8f9e22bbf"`
    );
    await queryRunner.query(`DROP TABLE "walkingapp"."walking_appointment"`);
    await queryRunner.query(`DROP TABLE "walkingapp"."walker_profile"`);
    await queryRunner.query(`DROP TABLE "walkingapp"."pet_profile"`);
    await queryRunner.query(`DROP TABLE "walkingapp"."emergency_contact"`);
  }
}
