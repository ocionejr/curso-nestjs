import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard())
@ApiTags('Tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Post()
  createTask(
    @Body() task: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(task, user);
  }

  @Get(':idTask')
  findTaskById(
    @Param('idTask') idTask: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.findTaskById(idTask, user);
  }

  @Delete(':idTask')
  deleteTask(
    @Param('idTask') idTask: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTaskById(idTask, user);
  }

  @Patch(':idTask/status')
  updateTaskStatus(
    @Param('idTask') idTask: string,
    @Body() status: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(idTask, status, user);
  }
}
