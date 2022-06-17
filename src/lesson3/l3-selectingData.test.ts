import AppDataSource from "../database-connection/appDatasource";
import { cleanAllPetRecords } from "./databaseAdmin";
import { Pet } from "./models/pet.entity";

describe("When selecting data from a single table", () => {
  const pet1Name = "spot";
  const pet2Name = "tabby";
  beforeAll(async () => {
    // clean the database and add some entries
    await cleanAllPetRecords();
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);

    const mikesPet = petRepository.create({
      name: pet1Name,
      ownerName: "mike",
    });
    const davesPet = petRepository.create({
      name: pet2Name,
      ownerName: "dave",
    });

    // create and save a couple of new pet owners
    await petRepository.save(mikesPet);
    await petRepository.save(davesPet);
  });

  afterAll(async () => {
    // clean up these entries
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);

    await petRepository.delete({ name: pet1Name });
    await petRepository.delete({ name: pet2Name });
  });

  it("can retrieve all entries", async () => {
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);

    const foundEntries = await petRepository.find();

    expect(foundEntries.length).toBe(2);
  });

  it("can retrieve specific entries", async () => {
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);

    // note typeorm makes sure our criteria are typesafe
    // note that find by still returns an array
    const foundEntries = await petRepository.findBy({
      name: pet1Name,
    });

    expect(foundEntries.length).toBe(1);
    expect(foundEntries[0].name).toBe(pet1Name);
  });

  it("can retrieve a single entry", async () => {
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);

    // find one by only returns the first found  object
    // it will not error if there are more than one items found
    const foundItem = await petRepository.findOneBy({
      name: pet1Name,
    });

    expect(foundItem?.name).toBe(pet1Name);
  });

  it("can specify what properties to select", async () => {
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);

    // note that we're specifying the properties to select
    const foundItems = await petRepository.find({
      where: { ownerName: "dave" },
      select: { ownerName: true },
    });

    expect(foundItems[0].ownerName).toBeDefined();
    expect(foundItems[0].name).toBeUndefined();
  });
});
