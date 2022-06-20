/* eslint-disable sonarjs/no-duplicate-string */
import { InsertResult } from "typeorm";
import AppDataSource from "../database-connection/appDatasource";
import { cleanAllPetRecords } from "./databaseAdmin";
import { PetL3 as Pet } from "./models/pet.entity";

describe("When inserting data to a single table", () => {
  // first we delete all existing entries to have a clean database
  beforeAll(async () => {
    return cleanAllPetRecords();
  });

  it("can insert using typeorm new class data model", async () => {
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);

    // create and save a new pet
    const petToSave = new Pet();
    petToSave.name = "bobby the dog";
    petToSave.ownerName = "mike";
    const savedPetOwner = await petRepository.save(petToSave);

    // now try to get it again
    const newEntries = await petRepository.findBy({
      name: savedPetOwner.name,
    });

    // check that it's ok
    expect(newEntries.length).toBe(1);
    expect(newEntries[0].name).toBe(petToSave.name);

    // clean up the record
    await petRepository.remove(petToSave);
  });

  it("can insert using a repository created model", async () => {
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);

    // create and save a new pet owner using the repository create method
    const pet = petRepository.create({
      name: "bobby - used create method",
      ownerName: "mike - used create method",
    });

    // note that this returns an entity
    const savedPet: Pet = await petRepository.save(pet);

    // now try to get it again
    const foundByNamePet = await petRepository.findBy({
      name: savedPet.name,
    });

    // check that the first item is what we expect
    expect(foundByNamePet.length).toBe(1);
    expect(foundByNamePet[0].name).toBe(pet.name);

    // try to find one pet by the saved pet id
    const foundByIdPet = await petRepository.findOneBy({
      id: savedPet.id,
    });

    // check that we got a result
    expect(foundByIdPet).toBeDefined();
    expect(foundByIdPet?.id).toBe(savedPet.id);

    // clean up
    await petRepository.remove(pet);
  });

  it("can insert using the insert method", async () => {
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);

    // create and save a new pet owner using the repository create method
    const pet = petRepository.create({
      name: "bobby - used create method",
      ownerName: "mike - used create method",
    });

    // note the different response type here. This is not a list of entities.
    // It's a raw insert result. the same as running the command in postico
    // with the same possibility for error
    const savedPetResult: InsertResult = await petRepository.insert(pet);

    expect(Array.isArray(savedPetResult.raw)).toBe(true);

    await petRepository.remove(pet);
  });

  it("can insert multiple entities in one call", async () => {
    const connection = await AppDataSource.connection();
    const petRepository = connection.getRepository(Pet);

    // create and save a new pet owner using the repository create method
    const pet1 = petRepository.create({
      name: "bobby - used create method",
      ownerName: "mike - used create method",
    });

    const pet2 = petRepository.create({
      name: "bobby - used create method",
      ownerName: "mike - used create method",
    });

    // save all pets in one call
    await petRepository.save([pet1, pet2]);

    // now try to get them again
    const foundPets = await petRepository.find();

    // check that there are more than one now
    expect(foundPets.length).toBe(2);

    // clean up
    await petRepository.remove(foundPets);
  });
});
