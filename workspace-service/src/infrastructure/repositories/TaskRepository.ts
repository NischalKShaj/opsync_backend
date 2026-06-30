import { ITaskRepository } from '../../domain/interfaces/ITaskRepository';
import { Task } from '../../domain/entities/Task';
import { TaskComment } from '../../domain/entities/TaskComment';
import db from '../database/connection';

export class TaskRepository implements ITaskRepository {
  async create(task: Omit<Task, 'id'>): Promise<Task> {
    const [result] = await db('tasks')
      .insert({
        project_id: task.projectId,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignee_id: task.assigneeId,
        due_date: task.dueDate,
        created_at: task.createdAt,
        updated_at: task.updatedAt,
      })
      .returning('*');
    
    return {
      id: result.id,
      projectId: result.project_id,
      title: result.title,
      description: result.description,
      status: result.status,
      priority: result.priority,
      assigneeId: result.assignee_id,
      dueDate: result.due_date,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async findById(id: string): Promise<Task | null> {
    const result = await db('tasks').where({ id }).first();
    if (!result) return null;

    return {
      id: result.id,
      projectId: result.project_id,
      title: result.title,
      description: result.description,
      status: result.status,
      priority: result.priority,
      assigneeId: result.assignee_id,
      dueDate: result.due_date,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async findByProjectId(projectId: string): Promise<Task[]> {
    const results = await db('tasks').where({ project_id: projectId });
    return results.map(result => ({
      id: result.id,
      projectId: result.project_id,
      title: result.title,
      description: result.description,
      status: result.status,
      priority: result.priority,
      assigneeId: result.assignee_id,
      dueDate: result.due_date,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    }));
  }

  async findByAssigneeId(assigneeId: string): Promise<Task[]> {
    const results = await db('tasks').where({ assignee_id: assigneeId });
    return results.map(result => ({
      id: result.id,
      projectId: result.project_id,
      title: result.title,
      description: result.description,
      status: result.status,
      priority: result.priority,
      assigneeId: result.assignee_id,
      dueDate: result.due_date,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    }));
  }

  async update(id: string, data: Partial<Omit<Task, 'id'>>): Promise<Task | null> {
    const [result] = await db('tasks')
      .where({ id })
      .update({
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status && { status: data.status }),
        ...(data.priority && { priority: data.priority }),
        ...(data.assigneeId !== undefined && { assignee_id: data.assigneeId }),
        ...(data.dueDate !== undefined && { due_date: data.dueDate }),
        ...(data.updatedAt && { updated_at: data.updatedAt }),
      })
      .returning('*');
    
    if (!result) return null;

    return {
      id: result.id,
      projectId: result.project_id,
      title: result.title,
      description: result.description,
      status: result.status,
      priority: result.priority,
      assigneeId: result.assignee_id,
      dueDate: result.due_date,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async delete(id: string): Promise<boolean> {
    const result = await db('tasks').where({ id }).delete();
    return result > 0;
  }

  async addComment(comment: Omit<TaskComment, 'id'>): Promise<TaskComment> {
    const [result] = await db('task_comments')
      .insert({
        task_id: comment.taskId,
        user_id: comment.userId,
        content: comment.content,
        created_at: comment.createdAt,
        updated_at: comment.updatedAt,
      })
      .returning('*');
    
    return {
      id: result.id,
      taskId: result.task_id,
      userId: result.user_id,
      content: result.content,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async getComments(taskId: string): Promise<TaskComment[]> {
    const results = await db('task_comments').where({ task_id: taskId });
    return results.map(result => ({
      id: result.id,
      taskId: result.task_id,
      userId: result.user_id,
      content: result.content,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    }));
  }
}
