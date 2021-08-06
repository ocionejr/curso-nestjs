import { TaskStatus } from '../tasks.model';
import { ApiProperty } from '@nestjs/swagger';

export class GetTasksFilterDto {
  @ApiProperty({ name: 'status', enum: TaskStatus, required: false })
  status?: TaskStatus;

  @ApiProperty({ name: 'search', type: 'string', required: false })
  search?: string;
}
