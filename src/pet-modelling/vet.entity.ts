import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./pet.entity";

@Entity()
export class Vet {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => Pet, (pet) => pet.vets)
  @JoinTable({
    name: "vet_pet",
    joinColumn: { name: "pet_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "vet_id", referencedColumnName: "id" },
  })
  pets!: Pet[];
}
