/* eslint-disable @typescript-eslint/naming-convention */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { WalkingAppointment } from "./walking-appointment.entity";

@Entity({ schema: "walkingapp" })
export class WalkerProfile {
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

  @OneToMany(() => WalkingAppointment, (wp) => wp.walkerProfile)
  walkingAppointments!: WalkingAppointment[];
}
