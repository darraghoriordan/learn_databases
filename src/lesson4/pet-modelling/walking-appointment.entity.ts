/* eslint-disable @typescript-eslint/naming-convention */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";

import { Pet } from "./pet.entity";
import { WalkerProfile } from "./walker-profile.entity";

@Entity({ schema: "walkingapp" })
export class WalkingAppointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "timestamptz" })
  @Index()
  startAt!: Date;

  @Column({ type: "timestamptz" })
  @Index()
  endAt!: Date;

  @Column()
  @Index()
  petId!: number;

  @ManyToOne(() => Pet, (pet) => pet.walkingAppointments)
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet!: Pet;

  @Column()
  @Index()
  walkerProfileId!: number;

  @ManyToOne(() => WalkerProfile, (wp) => wp.walkingAppointments)
  @JoinColumn({ name: "walkerProfileId", referencedColumnName: "id" })
  walkerProfile!: WalkerProfile;
}
