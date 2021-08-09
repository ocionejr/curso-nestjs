import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public GetAllTasks(): Task[] {
    return this.tasks;
  }

  public GetTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasksFiltered;

    if (status) {
      tasksFiltered = this.tasks.filter((task) => task.status == status);
    }

    if (search) {
      tasksFiltered = this.tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasksFiltered;
  }

  public CreateTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  public FindTaskById(id: string): Task {
    const task = this.tasks.find((item) => item.id === id);

    if (!task) throw new NotFoundException('Não existe task com esse id');

    return task;
  }

  public DeleteTaskById(id: string): void {
    const index = this.tasks.indexOf(this.FindTaskById(id));
    this.tasks.splice(index, 1);
  }

  public UpdateTaskStatus(id: string, taskStatus: UpdateTaskDto): Task {
    console.log('taskStatus', taskStatus);
    console.log('id', id);
    const task = this.FindTaskById(id);
    task.status = taskStatus.status;

    return task;
  }
}
