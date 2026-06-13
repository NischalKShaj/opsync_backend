import { ITeamRepository } from '../../../domain/interfaces/ITeamRepository';
import { IActivityLogRepository } from '../../../domain/interfaces/IActivityLogRepository';
import { Team } from '../../../domain/entities/Team';
import { CreateTeamDTO } from '../../dto/team/CreateTeamDTO';

export class CreateTeam {
  constructor(
    private teamRepository: ITeamRepository,
    private activityLogRepository: IActivityLogRepository
  ) {}

  async execute(dto: CreateTeamDTO, userId: string): Promise<Team> {
    const team = await this.teamRepository.create({
      workspaceId: dto.workspaceId,
      name: dto.name,
      description: dto.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.activityLogRepository.create({
      workspaceId: dto.workspaceId,
      userId: userId,
      action: 'team_created',
      entityType: 'team',
      entityId: team.id,
      metadata: { teamName: team.name },
      createdAt: new Date(),
    });

    return team;
  }
}
