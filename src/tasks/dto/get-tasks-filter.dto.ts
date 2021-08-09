import { TaskStatus } from '../tasks.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetTasksFilterDto {
  @ApiProperty({ name: 'status', enum: TaskStatus, required: false })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({ name: 'search', type: 'string', required: false })
  @IsOptional()
  @IsString()
  search?: string;
}
