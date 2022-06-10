import AppDataSource from "./appDatasource";

afterAll(async () => {
  await AppDataSource.closeConnections();
});

describe("Test the data base connection", () => {
  it("should be able to select 1", async () => {
    const connection = await AppDataSource.connection();
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const queryRunner = await connection.createQueryRunner();
    const selection = (await queryRunner.manager.query(
      "SELECT 1 as TestResult"
    )) as [{ testresult: number }];
    console.log(selection);
    console.log(selection[0]);
    return expect(selection[0].testresult).toBe(1);
  });
});
