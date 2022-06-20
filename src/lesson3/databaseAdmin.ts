import AppDataSource from "../database-connection/appDatasource";

export const cleanAllPetRecords = async () => {
  const connection = await AppDataSource.connection();
  const queryRunner = connection.createQueryRunner();
  await queryRunner.query(`DELETE FROM "lesson3"."pet"`);
  await queryRunner.release();
};
