import { Task } from 'src/entity/task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// will add logic that available in any module
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTask(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere(`task.status = :status`, { status });
    }
    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    return query.getMany();
  }

  // const { title, description } = createTaskDto;
  // const task = new Task();
  // task.title = title;
  // task.description = description;
  // task.status = TaskStatus.OPEN;
  // task.save();
  // return task;
}
