import AppDataSource from "../database-connection/appDatasource";

export const cleanAllPetRecords = async () => {
  const connection = await AppDataSource.connection();
  const queryRunner = connection.createQueryRunner();
  await queryRunner.manager.query("DELETE FROM pet");
  await queryRunner.release();
};
