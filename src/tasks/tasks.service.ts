import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async findTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id, user });

    if (!found) throw new NotFoundException('Não existe task com esse id');

    return found;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const deleteResult = await this.tasksRepository.delete({ id, user });

    if (deleteResult.affected === 0)
      throw new NotFoundException('Não existe task com esse id');
  }

  async updateTaskStatus(
    id: string,
    taskStatus: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.findTaskById(id, user);

    task.status = taskStatus.status;
    await this.tasksRepository.save(task);

    return task;
  }
}
