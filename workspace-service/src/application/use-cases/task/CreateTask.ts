import { ITaskRepository } from '../../../domain/interfaces/ITaskRepository';
import { IProjectRepository } from '../../../domain/interfaces/IProjectRepository';
import { ITeamRepository } from '../../../domain/interfaces/ITeamRepository';
import { IActivityLogRepository } from '../../../domain/interfaces/IActivityLogRepository';
import { Task } from '../../../domain/entities/Task';
import { CreateTaskDTO } from '../../dto/task/CreateTaskDTO';

export class CreateTask {
  constructor(
    private taskRepository: ITaskRepository,
    private projectRepository: IProjectRepository,
    private teamRepository: ITeamRepository,
    private activityLogRepository: IActivityLogRepository
  ) {}

  async execute(dto: CreateTaskDTO, userId: string): Promise<Task> {
    // Verify project exists
    const project = await this.projectRepository.findById(dto.projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    // Verify team exists
    const team = await this.teamRepository.findById(project.teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    const task = await this.taskRepository.create({
      projectId: dto.projectId,
      title: dto.title,
      description: dto.description,
      status: dto.status || 'todo',
      priority: dto.priority || 'medium',
      assigneeId: dto.assigneeId,
      dueDate: dto.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.activityLogRepository.create({
      workspaceId: team.workspaceId,
      userId: userId,
      action: 'task_created',
      entityType: 'task',
      entityId: task.id,
      metadata: { 
        taskTitle: task.title, 
        projectId: dto.projectId,
        assigneeId: dto.assigneeId 
      },
      createdAt: new Date(),
    });

    return task;
  }
}
