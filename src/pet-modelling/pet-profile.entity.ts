/* eslint-disable @typescript-eslint/naming-convention */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PetProfile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  isHouseTrained!: boolean;
}
