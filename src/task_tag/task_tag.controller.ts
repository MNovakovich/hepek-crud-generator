import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { TaskTag } from './task_tag.entity';
import { TaskTagService } from './task_tag.service';

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
