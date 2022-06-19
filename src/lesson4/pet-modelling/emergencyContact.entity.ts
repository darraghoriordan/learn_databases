import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pet } from "./pet.entity";

@Entity({ schema: "walkingapp" })
export class EmergencyContact {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  mobilePhone!: string;

  @Column()
  homePhone!: string;

  @Column()
  typeOfContact!: string;

  @ManyToMany(() => Pet, (pet) => pet.emergencyContacts)
  @JoinTable({
    name: "emergency_contact_pet",
    joinColumn: { name: "petId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "vetId", referencedColumnName: "id" },
  })
  pets!: Pet[];
}
