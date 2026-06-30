import { IProjectRepository } from '../../../domain/interfaces/IProjectRepository';
import { ITeamRepository } from '../../../domain/interfaces/ITeamRepository';
import { IActivityLogRepository } from '../../../domain/interfaces/IActivityLogRepository';
import { Project } from '../../../domain/entities/Project';
import { CreateProjectDTO } from '../../dto/project/CreateProjectDTO';

export class CreateProject {
  constructor(
    private projectRepository: IProjectRepository,
    private teamRepository: ITeamRepository,
    private activityLogRepository: IActivityLogRepository
  ) {}

  async execute(dto: CreateProjectDTO, userId: string): Promise<Project> {
    // Verify team exists
    const team = await this.teamRepository.findById(dto.teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    const project = await this.projectRepository.create({
      teamId: dto.teamId,
      name: dto.name,
      description: dto.description,
      status: dto.status || 'active',
      startDate: dto.startDate,
      endDate: dto.endDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.activityLogRepository.create({
      workspaceId: team.workspaceId,
      userId: userId,
      action: 'project_created',
      entityType: 'project',
      entityId: project.id,
      metadata: { projectName: project.name, teamId: dto.teamId },
      createdAt: new Date(),
    });

    return project;
  }
}
