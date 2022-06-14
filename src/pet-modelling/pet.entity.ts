/* eslint-disable @typescript-eslint/naming-convention */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  OneToOne,
  ManyToMany,
} from "typeorm";
import { PetOwner } from "./pet-owner.entity";
import { PetProfile } from "./pet-profile.entity";
import { Vet } from "./vet.entity";

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  @Index()
  owner_id!: number;

  @Column()
  @Index()
  profile_id!: number;

  @ManyToOne(() => PetOwner, (owner) => owner.pets)
  @JoinColumn({ name: "owner_id", referencedColumnName: "id" })
  owner!: PetOwner;

  @OneToOne(() => PetProfile)
  @JoinColumn({ name: "profile_id", referencedColumnName: "id" })
  profile!: PetProfile;

  @ManyToMany(() => Vet, (vet) => vet.pets)
  vets!: Vet[];
}
