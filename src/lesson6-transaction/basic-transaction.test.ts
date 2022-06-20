/* eslint-disable sonarjs/no-identical-functions */
import AppDataSource from "../database-connection/appDatasource";
import { cleanAllPetRecords } from "../lesson3/databaseAdmin";
import { PetL3 as Pet } from "../lesson3/models/pet.entity";

const testTransaction = async (): Promise<void> => {
  const connection = await AppDataSource.connection();
  const queryRunner = connection.createQueryRunner();

  // create a new pet
  const petToSave1 = new Pet();
  petToSave1.name = "bobby the dog";
  petToSave1.ownerName = "tx_owner";

  // create a new pet
  const petToSave2 = new Pet();
  petToSave2.name = "bobby the dog";
  petToSave2.ownerName = "tx_owner";

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.manager.save(petToSave1);
    await queryRunner.manager.save(petToSave2);

    await queryRunner.commitTransaction();
  } catch {
    // since we have errors lets rollback the changes we made
    await queryRunner.rollbackTransaction();
  } finally {
    // you need to release a queryRunner which was manually instantiated
    await queryRunner.release();
  }
};

describe("When updating data", () => {
  // first we delete all entries
  beforeAll(async () => {
    await cleanAllPetRecords();
  });

  it("can use a transaction", async () => {
    // run the tx above
    await expect(testTransaction()).resolves.toBeUndefined();

    // try to get the results
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);
    const newEntries = await petRepository.findBy({
      ownerName: "tx_owner",
    });
    expect(newEntries.length).toBe(2);
  });

  afterAll(async () => {
    await cleanAllPetRecords();
  });
});
