import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterException } from 'src/common/filterException';
import { HttpExceptionFilter } from 'src/common/HttpExceptionFilter.';
import { Task } from 'src/entity/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  async getAllTask(filterDto: GetTasksFilterDto) {
    return this.taskRepository.getTask(filterDto);
  }
  getTask(filterDto: GetTasksFilterDto) {
    throw new Error('Method not implemented.');
  }

  async getTaskById(id: number): Promise<Task> {
    try {
      const found = await this.taskRepository.findOne(id);
      if (!found) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return found;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      if (!createTaskDto.status) {
        createTaskDto.status = TaskStatus.DONE;
      }
      const task = this.taskRepository.create(createTaskDto);
      return task.save();
    } catch (err) {
      throw new FilterException(err);
    }
  }

  async deleteTask(id: number): Promise<any> {
    try {
      const found = await this.taskRepository.delete(id);
      if (found.affected == 0) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
    } catch (err) {
      throw new FilterException(err);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<any> {
    try {
      const task = await this.taskRepository.update(id, { status });
      if (task.affected != 1) {
        throw new BadRequestException(`Update task failed`);
      }

      // const taskSave = await this.taskRepository.findOne(id);
      // taskSave.status = status
      // taskSave.save()
      // return taskSave

      return task;
    } catch (err) {
      throw new FilterException(err);
    }
  }
}
