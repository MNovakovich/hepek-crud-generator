import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "./Tag";
import { Task } from "./Task";

@Index("FK_TagTaskTags", ["tagId"], {})
@Index("FK_TaskTaskTags", ["taskId"], {})
@Entity("task_tag", { schema: "node_db" })
export class TaskTag {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "task_id" })
  taskId: number;

  @Column("int", { name: "tag_id" })
  tagId: number;

  @ManyToOne(() => Tag, (tag) => tag.taskTags, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
  tag: Tag;

  @ManyToOne(() => Task, (task) => task.taskTags, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "task_id", referencedColumnName: "id" }])
  task: Task;
}
