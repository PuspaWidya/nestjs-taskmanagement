import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from 'src/entity/task.entity';
import { TaskStatus } from './task-status.enum';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @UseGuards(LocalAuthGuard)
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto) {
    return this.tasksService.getAllTask(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req, // give entire object of entity
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, req.user);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: number,
    @Body('status') status: TaskStatus,
  ): Promise<any> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
