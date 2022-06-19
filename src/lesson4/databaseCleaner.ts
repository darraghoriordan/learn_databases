import AppDataSource from "../database-connection/appDatasource";

export const clearRecords = async () => {
  const connection = await AppDataSource.connection();
  const queryRunner = connection.createQueryRunner();
  await queryRunner.query(`DELETE FROM "walkingapp"."emergency_contact_pet"`);
  await queryRunner.query(`DELETE FROM "walkingapp"."pet_l3"`);
  await queryRunner.query(`DELETE FROM "walkingapp"."walking_appointment"`);
  await queryRunner.query(`DELETE FROM "walkingapp"."walker_profile"`);
  await queryRunner.query(`DELETE FROM "walkingapp"."pet"`);
  await queryRunner.query(`DELETE FROM "walkingapp"."pet_profile"`);
  await queryRunner.query(`DELETE FROM "walkingapp"."emergency_contact"`);
  await queryRunner.query(`DELETE FROM "walkingapp"."pet_owner"`);

  await queryRunner.release();
};
