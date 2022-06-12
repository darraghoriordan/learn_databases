import "reflect-metadata";

import AppDataSource from "../database-connection/appDatasource";

afterAll(async () => {
  await AppDataSource.closeConnections();
});
