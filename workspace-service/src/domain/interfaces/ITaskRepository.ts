import { Task } from '../entities/Task';
import { TaskComment } from '../entities/TaskComment';

export interface ITaskRepository {
  create(task: Omit<Task, 'id'>): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findByProjectId(projectId: string): Promise<Task[]>;
  findByAssigneeId(assigneeId: string): Promise<Task[]>;
  update(id: string, data: Partial<Omit<Task, 'id'>>): Promise<Task | null>;
  delete(id: string): Promise<boolean>;
  addComment(comment: Omit<TaskComment, 'id'>): Promise<TaskComment>;
  getComments(taskId: string): Promise<TaskComment[]>;
}
