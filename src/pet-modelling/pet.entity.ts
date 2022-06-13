/* eslint-disable @typescript-eslint/naming-convention */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { PetOwner } from "./pet-owner.entity";

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  owner_id!: number;

  @ManyToOne(() => PetOwner, (owner) => owner.pets)
  @JoinColumn({ name: "owner_id", referencedColumnName: "id" })
  owner!: PetOwner;
}
