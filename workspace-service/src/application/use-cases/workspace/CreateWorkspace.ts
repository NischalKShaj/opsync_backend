import { IWorkspaceRepository } from '../../../domain/interfaces/IWorkspaceRepository';
import { IActivityLogRepository } from '../../../domain/interfaces/IActivityLogRepository';
import { Workspace } from '../../../domain/entities/Workspace';
import { CreateWorkspaceDTO } from '../../dto/workspace/CreateWorkspaceDTO';

export class CreateWorkspace {
  constructor(
    private workspaceRepository: IWorkspaceRepository,
    private activityLogRepository: IActivityLogRepository
  ) {}

  async execute(dto: CreateWorkspaceDTO): Promise<Workspace> {
    const workspace = await this.workspaceRepository.create({
      name: dto.name,
      description: dto.description,
      ownerId: dto.ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Add owner as a member with default role
    await this.workspaceRepository.addMember({
      workspaceId: workspace.id,
      userId: dto.ownerId,
      roleId: 'owner-role-id', // This should be fetched from roles table
    });

    // Log activity
    await this.activityLogRepository.create({
      workspaceId: workspace.id,
      userId: dto.ownerId,
      action: 'workspace_created',
      entityType: 'workspace',
      entityId: workspace.id,
      metadata: { workspaceName: workspace.name },
      createdAt: new Date(),
    });

    return workspace;
  }
}
