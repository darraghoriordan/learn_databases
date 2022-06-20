/* eslint-disable @typescript-eslint/no-unused-vars */
import AppDataSource from "../database-connection/appDatasource";
import { PetOwner } from "./pet-modelling/pet-owner.entity";
import { PetProfile } from "./pet-modelling/pet-profile.entity";
import { clearRecords } from "./databaseCleaner";
import { Pet } from "./pet-modelling/pet.entity";
import { WalkerProfile } from "./pet-modelling/walker-profile.entity";
import { WalkingAppointment } from "./pet-modelling/walking-appointment.entity";

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
      name: "mikes cat",
      type: "cat",
      breed: "shorthair",
      instagramUrl: "someurl",
    });
    const mikeDogProfile = petProfileRepository.create({
      isHouseTrained: true,
      name: "mikes doggo",
      type: "dog",
      breed: "pom",
    });
    await petProfileRepository.save([mikeCatProfile, mikeDogProfile]);

    // create and save a new pet owner
    const mikePetOwner = petOwnerRepository.create();
    mikePetOwner.name = mikeName;
    mikePetOwner.address = "some address";
    mikePetOwner.homePhone = "12345";
    mikePetOwner.mobile = "54321";

    await petOwnerRepository.save(mikePetOwner);

    // save the pets
    const mikePets = petRepository.create([
      { owner: mikePetOwner, profile: mikeDogProfile },
      { owner: mikePetOwner, profile: mikeCatProfile },
    ]);

    const result = await petRepository.save(mikePets);

    expect(result.length).toBe(2);
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

  it("can find appointments", async () => {
    const connection = await AppDataSource.connection();
    const walkerProfileRepository = connection.getRepository(WalkerProfile);
    const petOwnerRepository = connection.getRepository(PetOwner);

    const walkerProfile = await walkerProfileRepository.save({
      address: "some address",
      homePhone: "1234",
      mobilePhone: "4321",
      name: "darragh",
    });

    const mikePetOWner = await petOwnerRepository.findOneOrFail({
      where: { name: mikeName },
      relations: { pets: true },
    });

    const walkAppointmentRepo = connection.getRepository(WalkingAppointment);

    const appointmentToSave = walkAppointmentRepo.create({
      endAt: new Date(2022, 1, 5),
      pet: mikePetOWner.pets[0],
      startAt: new Date(2022, 1, 1),
      walkerProfile: walkerProfile,
    });
    const savedAppointment = await walkAppointmentRepo.save(appointmentToSave);

    // save another one
    const appointmentToSave2 = walkAppointmentRepo.create({
      endAt: new Date(2022, 2, 5),
      pet: mikePetOWner.pets[0],
      startAt: new Date(2022, 2, 1),
      walkerProfile: walkerProfile,
    });
    const savedAppointment2 = await walkAppointmentRepo.save(
      appointmentToSave2
    );

    // confirm save
    expect(savedAppointment).not.toBeUndefined();
    expect(savedAppointment2).not.toBeUndefined();

    const maxNextDateQuery = walkAppointmentRepo
      .createQueryBuilder("mxapts")
      .select(`max(mxapts."startAt")`)
      .innerJoin(Pet, "mxpets", `mxapts."petId" = mxpets.id`)
      .innerJoin(PetProfile, "mxpprofile", `mxpprofile.id = mxpets."profileId"`)
      .innerJoin(PetOwner, "mxpowner", `mxpowner.id = mxpets."ownerId"`)
      .where("mxpowner.name = :ownerName", { ownerName: mikeName });

    const appointmentQueryResult = await walkAppointmentRepo
      .createQueryBuilder("apts")
      .select(`"pprofile"."name", "apts"."startAt"`)
      .innerJoin(Pet, "pets", `apts."petId" = pets.id`)
      .innerJoin(PetProfile, "pprofile", `pprofile.id = pets."profileId"`)
      .innerJoin(PetOwner, "powner", `powner.id = pets."ownerId"`)
      .where("powner.name = :ownerName", { ownerName: mikeName })
      .andWhere(`apts.startAt = (${maxNextDateQuery.getSql()})`)
      .getRawMany();

    expect(appointmentQueryResult.length).toBe(1);
    expect(
      (appointmentQueryResult[0] as { name: string; startAt: string }).name
    ).toBe("mikes doggo");
  });

  afterAll(async () => {
    await clearRecords();
  });
});
