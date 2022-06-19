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
  OneToMany,
} from "typeorm";
import { EmergencyContact } from "./emergencyContact.entity";
import { PetOwner } from "./pet-owner.entity";
import { PetProfile } from "./pet-profile.entity";
import { WalkingAppointment } from "./walking-appointment.entity";

@Entity({ schema: "walkingapp" })
export class Pet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index()
  ownerId!: number;

  @ManyToOne(() => PetOwner, (owner) => owner.pets)
  @JoinColumn({ name: "ownerId", referencedColumnName: "id" })
  owner!: PetOwner;

  @Column()
  @Index()
  profileId!: number;

  @OneToOne(() => PetProfile)
  @JoinColumn({ name: "profileId", referencedColumnName: "id" })
  profile!: PetProfile;

  @OneToMany(() => WalkingAppointment, (wp) => wp.pet)
  walkingAppointments!: WalkingAppointment[];

  @ManyToMany(
    () => EmergencyContact,
    (emergencyContact) => emergencyContact.pets
  )
  emergencyContacts!: EmergencyContact[];
}
