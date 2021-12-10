import { Test } from '@nestjs/testing';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockUser = {
  username: 'test1',
  email: 'test1@mail.com',
};

const mockTestRepository = () => ({
  getTask: jest.fn(),
});

describe('taskService', () => {
  let taskService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTestRepository },
      ],
    }).compile();

    taskService = await module.get(TasksService);
    taskRepository = await module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from repository', async () => {
      taskRepository.getTask.mockResolvedValue('someValue');
      expect(taskRepository.getTask).not.toHaveBeenCalled();
      const filters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'some search',
      };
      const data = await taskService.getTask(filters, mockUser);
      expect(taskRepository.getTask).toHaveBeenCalled();
      expect(data).toEqual('someValue');
    });
  });
});
