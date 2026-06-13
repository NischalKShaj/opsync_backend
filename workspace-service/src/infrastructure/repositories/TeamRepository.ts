import { ITeamRepository } from '../../domain/interfaces/ITeamRepository';
import { Team } from '../../domain/entities/Team';
import { TeamMember } from '../../domain/entities/TeamMember';
import db from '../database/connection';

export class TeamRepository implements ITeamRepository {
  async create(team: Omit<Team, 'id'>): Promise<Team> {
    const [result] = await db('teams')
      .insert({
        workspace_id: team.workspaceId,
        name: team.name,
        description: team.description,
        created_at: team.createdAt,
        updated_at: team.updatedAt,
      })
      .returning('*');
    
    return {
      id: result.id,
      workspaceId: result.workspace_id,
      name: result.name,
      description: result.description,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async findById(id: string): Promise<Team | null> {
    const result = await db('teams').where({ id }).first();
    if (!result) return null;

    return {
      id: result.id,
      workspaceId: result.workspace_id,
      name: result.name,
      description: result.description,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async findByWorkspaceId(workspaceId: string): Promise<Team[]> {
    const results = await db('teams').where({ workspace_id: workspaceId });
    return results.map(result => ({
      id: result.id,
      workspaceId: result.workspace_id,
      name: result.name,
      description: result.description,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    }));
  }

  async update(id: string, data: Partial<Omit<Team, 'id'>>): Promise<Team | null> {
    const [result] = await db('teams')
      .where({ id })
      .update({
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.updatedAt && { updated_at: data.updatedAt }),
      })
      .returning('*');
    
    if (!result) return null;

    return {
      id: result.id,
      workspaceId: result.workspace_id,
      name: result.name,
      description: result.description,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async delete(id: string): Promise<boolean> {
    const result = await db('teams').where({ id }).delete();
    return result > 0;
  }

  async addMember(member: Omit<TeamMember, 'id' | 'joinedAt'>): Promise<TeamMember> {
    const [result] = await db('team_members')
      .insert({
        team_id: member.teamId,
        user_id: member.userId,
        role_id: member.roleId,
        joined_at: new Date(),
      })
      .returning('*');
    
    return {
      id: result.id,
      teamId: result.team_id,
      userId: result.user_id,
      roleId: result.role_id,
      joinedAt: result.joined_at,
    };
  }

  async removeMember(teamId: string, userId: string): Promise<boolean> {
    const result = await db('team_members')
      .where({ team_id: teamId, user_id: userId })
      .delete();
    return result > 0;
  }

  async getMembers(teamId: string): Promise<TeamMember[]> {
    const results = await db('team_members').where({ team_id: teamId });
    return results.map(result => ({
      id: result.id,
      teamId: result.team_id,
      userId: result.user_id,
      roleId: result.role_id,
      joinedAt: result.joined_at,
    }));
  }

  async isMember(teamId: string, userId: string): Promise<boolean> {
    const result = await db('team_members')
      .where({ team_id: teamId, user_id: userId })
      .first();
    return !!result;
  }
}
