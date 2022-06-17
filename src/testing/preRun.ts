import "reflect-metadata";

import AppDataSource from "../database-connection/appDatasource";
jest.setTimeout(1_000_000);
afterAll(async () => {
  await AppDataSource.closeConnections();
});
