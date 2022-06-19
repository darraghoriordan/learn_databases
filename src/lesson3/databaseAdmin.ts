import AppDataSource from "../database-connection/appDatasource";

export const cleanAllPetRecords = async () => {
  const connection = await AppDataSource.connection();
  const queryRunner = connection.createQueryRunner();
  await queryRunner.query(`DELETE FROM "walkingapp"."pet_l3"`);
  await queryRunner.release();
};
