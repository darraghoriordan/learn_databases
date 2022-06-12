import AppDataSource from "../database-connection/appDatasource";
import { PetOwner } from "../pet-modelling/pet-owner.entity";

describe("When selecting data", () => {
  // first we delete all entries
  beforeAll(async () => {
    const connection = await AppDataSource.connection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.manager.query("DELETE FROM pet_owner");
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

  it("can retrieve all entries", async () => {
    const connection = await AppDataSource.connection();
    const petOwnerRepository = connection.getRepository(PetOwner);
    const newEntries = await petOwnerRepository.find();

    expect(newEntries.length).toBe(2);
  });

  it("can retrieve specific entries", async () => {
    const connection = await AppDataSource.connection();
    const petOwnerRepository = connection.getRepository(PetOwner);
    const newEntries = await petOwnerRepository.findBy({
      name: daveOwner.name,
    });

    expect(newEntries.length).toBe(1);
    expect(newEntries[0].name).toBe(daveOwner.name);
  });

  afterAll(async () => {
    const connection = await AppDataSource.connection();
    const petOwnerRepository = connection.getRepository(PetOwner);
    await petOwnerRepository.remove(mikeOwner);
    await petOwnerRepository.remove(daveOwner);
  });
});
