import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todo", { schema: "node_db" })
export class Todo {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "title", length: 128 })
  title: string;

  @Column("tinyint", {
    name: "completed",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  completed: boolean | null;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;
}
