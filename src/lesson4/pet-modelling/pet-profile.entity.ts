/* eslint-disable @typescript-eslint/naming-convention */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "walkingapp" })
export class PetProfile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  isHouseTrained!: boolean;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  breed!: string;

  @Column({ nullable: true })
  instagramUrl?: string;
}
