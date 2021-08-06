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
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  GetTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.GetTasksWithFilters(filterDto);
    } else {
      return this.tasksService.GetAllTasks();
    }
  }

  @Post()
  CreateTask(@Body() task: CreateTaskDto) {
    return this.tasksService.CreateTask(task);
  }

  @Get(':idTask')
  FindTaskById(@Param('idTask') idTask: string) {
    const task: Task = this.tasksService.FindTaskById(idTask);
    return task;
  }

  @Delete(':idTask')
  DeleteTask(@Param('idTask') idTask: string) {
    this.tasksService.DeleteTaskById(idTask);
  }

  @Patch(':idTask/status')
  UpdateTaskStatus(
    @Param('idTask') idTask: string,
    @Body() status: UpdateTaskDto,
  ) {
    return this.tasksService.UpdateTaskStatus(idTask, status);
  }
}
