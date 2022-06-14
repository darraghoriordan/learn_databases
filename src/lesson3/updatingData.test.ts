import AppDataSource from "../database-connection/appDatasource";
import { PetOwner } from "../pet-modelling/pet-owner.entity";

describe("When updating data in a single table", () => {
  // first we delete all entries
  beforeAll(async () => {
    const connection = await AppDataSource.connection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.manager.query("DELETE FROM pet_owner");
    await queryRunner.release();
  });

  const mikeOwner = new PetOwner();
  mikeOwner.name = "mike loves doggos";
  const daveOwner = new PetOwner();
  daveOwner.name = "dave loves doggos";

  // eslint-disable-next-line jest/expect-expect
  it("can insert using type orm data model", async () => {
    const connection = await AppDataSource.connection();
    const petOwnerRepository = connection.getRepository(PetOwner);

    // create and save a couple of new pet owners

    await petOwnerRepository.save(mikeOwner);
    await petOwnerRepository.save(daveOwner);
  });

  it("can update a single entry using an entity reference", async () => {
    const connection = await AppDataSource.connection();
    const petOwnerRepository = connection.getRepository(PetOwner);

    // grab the object using typeorm
    const foundMikes = await petOwnerRepository.findBy({
      name: mikeOwner.name,
    });
    expect(foundMikes.length).toBe(1);

    // update the name

    await petOwnerRepository.update(foundMikes[0].id, {
      name: "this is an even newer name",
    });
    const findNewMikeEntries = await petOwnerRepository.findBy({
      name: "this is an even newer name",
    });

    expect(findNewMikeEntries.length).toBe(1);
  });
});
