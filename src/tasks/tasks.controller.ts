import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(task);
  }

  @Get(':idTask')
  findTaskById(@Param('idTask') idTask: string): Promise<Task> {
    return this.tasksService.findTaskById(idTask);
  }

  @Delete(':idTask')
  deleteTask(@Param('idTask') idTask: string): Promise<void> {
    return this.tasksService.deleteTaskById(idTask);
  }

  @Patch(':idTask/status')
  updateTaskStatus(
    @Param('idTask') idTask: string,
    @Body() status: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(idTask, status);
  }
}
