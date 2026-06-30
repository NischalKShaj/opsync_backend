import { IWorkspaceRepository } from '../../../domain/interfaces/IWorkspaceRepository';
import { IActivityLogRepository } from '../../../domain/interfaces/IActivityLogRepository';

export class DeleteWorkspace {
  constructor(
    private workspaceRepository: IWorkspaceRepository,
    private activityLogRepository: IActivityLogRepository
  ) {}

  async execute(id: string, userId: string): Promise<boolean> {
    const workspace = await this.workspaceRepository.findById(id);
    if (!workspace) return false;

    const deleted = await this.workspaceRepository.delete(id);

    if (deleted) {
      await this.activityLogRepository.create({
        workspaceId: workspace.id,
        userId: userId,
        action: 'workspace_deleted',
        entityType: 'workspace',
        entityId: workspace.id,
        metadata: { workspaceName: workspace.name },
        createdAt: new Date(),
      });
    }

    return deleted;
  }
}
