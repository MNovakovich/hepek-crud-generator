import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskTag } from '../task_tag/task_tag.entity';

@Entity("tag", { schema: "node_db" })
export class Tag {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 256 })
  title: string;

  @OneToMany(() => TaskTag, (taskTag) => taskTag.tag)
  taskTags: TaskTag[];
}
