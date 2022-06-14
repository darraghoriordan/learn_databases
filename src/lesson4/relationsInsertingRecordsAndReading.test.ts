import AppDataSource from "../database-connection/appDatasource";
import { PetOwner } from "../pet-modelling/pet-owner.entity";
import { PetProfile } from "../pet-modelling/pet-profile.entity";
import { Pet } from "../pet-modelling/pet.entity";
import { clearRecords } from "./databaseCleaner";

describe("When inserting data in multiple tables", () => {
  // first we delete all entries
  beforeAll(async () => {
    await clearRecords();
  });
  const mikeName = "mike loves doggos";
  // eslint-disable-next-line jest/expect-expect
  it("can insert using type orm data model", async () => {
    const connection = await AppDataSource.connection();
    const petOwnerRepository = connection.getRepository(PetOwner);
    const petRepository = connection.getRepository(Pet);
    const petProfileRepository = connection.getRepository(PetProfile);

    // create some pets
    const mikeCatProfile = petProfileRepository.create({
      isHouseTrained: false,
    });
    const mikeDogProfile = petProfileRepository.create({
      isHouseTrained: true,
    });
    await petProfileRepository.save([mikeCatProfile, mikeDogProfile]);

    // create and save a new pet owner
    const mikePetOwner = petOwnerRepository.create();
    mikePetOwner.name = mikeName;
    await petOwnerRepository.save(mikePetOwner);

    // create the pets
    const mikesCat = petRepository.create();
    mikesCat.name = "mikes cat";
    mikesCat.profile = mikeCatProfile;
    mikesCat.type = "cat";
    mikesCat.owner = mikePetOwner;

    const mikesDog = petRepository.create();
    mikesDog.name = "mikes dog";
    mikesDog.profile = mikeDogProfile;
    mikesDog.type = "dog";
    mikesDog.owner = mikePetOwner;
    // save them
    await petRepository.save([mikesCat, mikesDog]);
  });

  it("find result without relations", async () => {
    const connection = await AppDataSource.connection();
    const petOwnerRepository = connection.getRepository(PetOwner);
    // now try to get mike
    const foundMikeWithoutRelations = await petOwnerRepository.findOneBy({
      name: mikeName,
    });

    // check that it's without relations
    expect(foundMikeWithoutRelations).not.toBeUndefined();
    expect(foundMikeWithoutRelations?.pets).toBeUndefined();
  });

  it("use the built in left join on pets", async () => {
    const connection = await AppDataSource.connection();
    const petOwnerRepository = connection.getRepository(PetOwner);
    // now try to get mike
    const foundMikeWithPets = await petOwnerRepository.find({
      relations: { pets: true },
      where: {
        name: mikeName,
      },
    });

    // check that it's without relations
    expect(foundMikeWithPets[0]).not.toBeUndefined();
    expect(foundMikeWithPets[0]?.pets).not.toBeUndefined();
    expect(foundMikeWithPets[0]?.pets.length).toBe(2);
  });

  it("use a query builder", async () => {
    const connection = await AppDataSource.connection();

    const petOwners = await connection
      .getRepository(PetOwner)
      .createQueryBuilder("petOwners")
      .innerJoinAndSelect("petOwners.pets", "pet")
      .getMany();

    // check that it's without relations
    expect(petOwners[0]).not.toBeUndefined();
    expect(petOwners[0]?.pets).not.toBeUndefined();
    expect(petOwners[0]?.pets.length).toBe(2);
  });

  afterAll(async () => {
    await clearRecords();
  });
});
