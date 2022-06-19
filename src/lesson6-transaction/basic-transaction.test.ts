/* eslint-disable sonarjs/no-identical-functions */
import { EntityManager } from "typeorm";
import AppDataSource from "../database-connection/appDatasource";
import { PetOwner } from "../lesson4/pet-modelling/pet-owner.entity";

const testTransaction = async (): Promise<void> => {
  const connection = await AppDataSource.connection();
  const queryRunner = connection.createQueryRunner();
  const petOwner = new PetOwner();
  petOwner.name = "tx_owner";

  //   const pet1 = new Pet();
  //   pet1.name = "tx pet 1";
  //   pet1.owner = petOwner;
  //   pet1.type = "cat";

  //   const pet2 = new Pet();
  //   pet2.name = "tx pet 2";
  //   pet2.owner = petOwner;
  //   pet2.type = "dog";

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    async (transactionalEntityManager: EntityManager) => {
      await transactionalEntityManager.save(petOwner);
      //  await transactionalEntityManager.save(pet1);
      //  await transactionalEntityManager.save(pet2);
    };
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
    const connection = await AppDataSource.connection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.manager.query("DELETE FROM pet");
    await queryRunner.manager.query("DELETE FROM pet_owner");
    await queryRunner.release();
  });

  it("can use a transaction", async () => {
    await expect(testTransaction()).resolves.toBeUndefined();
    const connection = await AppDataSource.connection();
    const petOwnerRepository = connection.getRepository(PetOwner);
    const newEntries = await petOwnerRepository.findBy({ name: "tx_owner" });
    expect(newEntries.length).toBe(1);
  });

  afterAll(async () => {
    const connection = await AppDataSource.connection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.manager.query("DELETE FROM pet");
    await queryRunner.manager.query("DELETE FROM pet_owner");
    await queryRunner.release();
  });
});
