import AppDataSource from "../database-connection/appDatasource";

export const clearRecords = async () => {
  const connection = await AppDataSource.connection();
  const queryRunner = connection.createQueryRunner();
  await queryRunner.manager.query("DELETE FROM vet_pet");
  await queryRunner.manager.query("DELETE FROM pet");
  await queryRunner.manager.query("DELETE FROM vet");
  await queryRunner.manager.query("DELETE FROM pet_profile");
  await queryRunner.manager.query("DELETE FROM pet_owner");
  await queryRunner.release();
};
