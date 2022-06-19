/* eslint-disable @typescript-eslint/naming-convention */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pet } from "./pet.entity";

@Entity({ schema: "walkingapp" })
export class PetOwner {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  mobile!: string;

  @Column()
  homePhone!: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets!: Pet[];
}
