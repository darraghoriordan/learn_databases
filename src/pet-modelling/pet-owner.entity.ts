import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PetOwner {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
