import { Team } from '../entities/Team';
import { TeamMember } from '../entities/TeamMember';

export interface ITeamRepository {
  create(team: Omit<Team, 'id'>): Promise<Team>;
  findById(id: string): Promise<Team | null>;
  findByWorkspaceId(workspaceId: string): Promise<Team[]>;
  update(id: string, data: Partial<Omit<Team, 'id'>>): Promise<Team | null>;
  delete(id: string): Promise<boolean>;
  addMember(member: Omit<TeamMember, 'id' | 'joinedAt'>): Promise<TeamMember>;
  removeMember(teamId: string, userId: string): Promise<boolean>;
  getMembers(teamId: string): Promise<TeamMember[]>;
  isMember(teamId: string, userId: string): Promise<boolean>;
}
