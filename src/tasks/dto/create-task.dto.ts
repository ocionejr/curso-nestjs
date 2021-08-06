import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ name: 'title', type: 'string' })
  title: string;

  @ApiProperty({ name: 'description', type: 'string' })
  description: string;
}
