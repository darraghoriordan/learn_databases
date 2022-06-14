import AppDataSource from "../database-connection/appDatasource";
import { PetOwner } from "../pet-modelling/pet-owner.entity";

describe("When inserting data to a single table", () => {
  // first we delete all entries
  beforeAll(async () => {
    const connection = await AppDataSource.connection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.manager.query("DELETE FROM pet_owner");
    await queryRunner.release();
  });

  it("can insert using type orm data model", async () => {
    const connection = await AppDataSource.connection();
    const petOwnerRepository = connection.getRepository(PetOwner);

    // create and save a new pet owner
    const petOwner = new PetOwner();
    petOwner.name = "mike loves doggos";
    const savedPetOwner = await petOwnerRepository.save(petOwner);

    // now try to get it again
    const newEntries = await petOwnerRepository.findBy({
      name: savedPetOwner.name,
    });

    // check that it's ok
    expect(newEntries.length).toBe(1);
    expect(newEntries[0].name).toBe(petOwner.name);

    await petOwnerRepository.remove(petOwner);
  });

  it("can insert using a created model", async () => {
    const connection = await AppDataSource.connection();
    const petOwnerRepository = connection.getRepository(PetOwner);

    // create and save a new pet owner
    const petOwner = petOwnerRepository.create({
      name: "used create method",
    });

    const savedPetOwner = await petOwnerRepository.save(petOwner);

    // now try to get it again
    const newEntries = await petOwnerRepository.findBy({
      name: savedPetOwner.name,
    });

    // check that it's ok
    expect(newEntries.length).toBe(1);
    expect(newEntries[0].name).toBe(petOwner.name);

    await petOwnerRepository.remove(petOwner);
  });
});
