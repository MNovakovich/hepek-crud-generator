import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from '../task/task.entity';

@Entity("user", { schema: "node_db" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 128 })
  name: string;

  @Column("varchar", { name: "lastname", nullable: true, length: 128 })
  lastname: string | null;

  @Column("datetime", { name: "createdAt", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
