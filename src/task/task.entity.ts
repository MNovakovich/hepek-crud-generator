import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from '../user/user.entity';
import { TaskTag } from '../task_tag/task_tag.entity';

@Index("user_id", ["userId"], {})
@Entity("task", { schema: "node_db" })
export class Task {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("tinyint", { name: "is_completed", width: 1, default: () => "'0'" })
  isCompleted: boolean;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @OneToMany(() => TaskTag, (taskTag) => taskTag.task)
  taskTags: TaskTag[];
}
