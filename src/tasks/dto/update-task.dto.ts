import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../tasks.model';

export class UpdateTaskDto {
  @ApiProperty({ name: 'status', enum: TaskStatus })
  status: TaskStatus;
}
