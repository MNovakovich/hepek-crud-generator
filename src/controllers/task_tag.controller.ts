import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { ApiTags } from "@nestjs/swagger";
import { TaskTag } from '../models/TaskTag';
import { TaskTagService } from '../services/task_tag.service';

@ApiTags('TaskTag')
@Crud({
  model: {
    type: TaskTag,
  },
})
@Controller('TaskTag')
export class TaskTagController implements CrudController<TaskTag> {
  constructor(public service: TaskTagService) {}
}