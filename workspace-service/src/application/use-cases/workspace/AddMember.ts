import { IWorkspaceRepository } from '../../../domain/interfaces/IWorkspaceRepository';
import { IActivityLogRepository } from '../../../domain/interfaces/IActivityLogRepository';
import { WorkspaceMember } from '../../../domain/entities/WorkspaceMember';
import { AddMemberDTO } from '../../dto/workspace/AddMemberDTO';

export class AddMember {
  constructor(
    private workspaceRepository: IWorkspaceRepository,
    private activityLogRepository: IActivityLogRepository
  ) {}

  async execute(dto: AddMemberDTO, addedByUserId: string): Promise<WorkspaceMember> {
    const member = await this.workspaceRepository.addMember({
      workspaceId: dto.workspaceId,
      userId: dto.userId,
      roleId: dto.roleId,
    });

    await this.activityLogRepository.create({
      workspaceId: dto.workspaceId,
      userId: addedByUserId,
      action: 'member_added',
      entityType: 'workspace_member',
      entityId: member.id,
      metadata: { addedUserId: dto.userId, roleId: dto.roleId },
      createdAt: new Date(),
    });

    return member;
  }
}
