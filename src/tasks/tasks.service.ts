import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  // public GetAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // public GetTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasksFiltered;
  //   if (status) {
  //     tasksFiltered = this.tasks.filter((task) => task.status == status);
  //   }
  //   if (search) {
  //     tasksFiltered = this.tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasksFiltered;
  // }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async findTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) throw new NotFoundException('Não existe task com esse id');

    return found;
  }

  async deleteTaskById(id: string): Promise<void> {
    const deleteResult = await this.tasksRepository.delete(id);

    if (deleteResult.affected === 0)
      throw new NotFoundException('Não existe task com esse id');
  }

  async updateTaskStatus(id: string, taskStatus: UpdateTaskDto): Promise<Task> {
    const task = await this.findTaskById(id);

    task.status = taskStatus.status;
    await this.tasksRepository.save(task);

    return task;
  }
}
