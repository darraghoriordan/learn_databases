/* eslint-disable @typescript-eslint/naming-convention */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: "lesson3", name: "pet" })
export class PetL3 {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  ownerName!: string;
}
