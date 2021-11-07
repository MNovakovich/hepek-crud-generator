import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("role", { schema: "node_db" })
export class Role {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;
}
