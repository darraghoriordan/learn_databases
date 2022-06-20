/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppDataSource from "../database-connection/appDatasource";
import { cleanAllPetRecords } from "./databaseAdmin";
import { PetL3 as Pet } from "./models/pet.entity";

describe("When updating data in a single table", () => {
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

  it("can use save with an existing entity to update", async () => {
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);

    const nameToUpdateTo = "this is a new name";

    // grab the object using typeorm
    const foundPet = await petRepository.findOneBy({
      name: pet1Name,
    });
    expect(foundPet).toBeDefined();

    foundPet!.name = nameToUpdateTo;
    // update the name
    const saveResult = await petRepository.save(foundPet!);

    expect(saveResult.name).toBe(nameToUpdateTo);

    //set the name back
    foundPet!.name = pet1Name;
    await petRepository.save(foundPet!);
  });

  it("can use update with an id", async () => {
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);
    const newerName = "this is an even newer name";
    // grab the object using typeorm
    const foundPet = await petRepository.findOneBy({
      name: pet2Name,
    });
    expect(foundPet).toBeDefined();

    // update the name
    await petRepository.update(foundPet!.id, {
      name: newerName,
    });

    // try to get the entity again
    const updatedPet = await petRepository.findOneBy({
      name: newerName,
    });

    // check that the value was updated
    expect(updatedPet?.name).toBe(newerName);
  });

  it("can use update with a where clause", async () => {
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);
    const newName = "updated by a where clause";
    // grab the object using typeorm
    const foundPet = await petRepository.findOneBy({
      name: pet2Name,
    });
    expect(foundPet).toBeDefined();

    // update the name
    await petRepository.update(
      { name: pet1Name },
      {
        name: newName,
      }
    );

    // try to get the entity again
    const updatedPet = await petRepository.findOneBy({
      name: newName,
    });

    // check that the value was updated
    expect(updatedPet?.name).toBe(newName);
  });
});
