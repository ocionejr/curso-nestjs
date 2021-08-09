import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ name: 'title', type: 'string' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ name: 'description', type: 'string' })
  @IsNotEmpty()
  description: string;
}
