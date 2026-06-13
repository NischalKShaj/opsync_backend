import { IWorkspaceRepository } from '../../../domain/interfaces/IWorkspaceRepository';
import { IActivityLogRepository } from '../../../domain/interfaces/IActivityLogRepository';
import { Workspace } from '../../../domain/entities/Workspace';
import { UpdateWorkspaceDTO } from '../../dto/workspace/UpdateWorkspaceDTO';

export class UpdateWorkspace {
  constructor(
    private workspaceRepository: IWorkspaceRepository,
    private activityLogRepository: IActivityLogRepository
  ) {}

  async execute(id: string, dto: UpdateWorkspaceDTO, userId: string): Promise<Workspace | null> {
    const workspace = await this.workspaceRepository.update(id, {
      name: dto.name,
      description: dto.description,
    });

    if (workspace) {
      await this.activityLogRepository.create({
        workspaceId: workspace.id,
        userId: userId,
        action: 'workspace_updated',
        entityType: 'workspace',
        entityId: workspace.id,
        metadata: { changes: dto },
        createdAt: new Date(),
      });
    }

    return workspace;
  }
}
