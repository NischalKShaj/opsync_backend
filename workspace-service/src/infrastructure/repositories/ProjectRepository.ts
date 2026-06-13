import { IProjectRepository } from '../../domain/interfaces/IProjectRepository';
import { Project } from '../../domain/entities/Project';
import db from '../database/connection';

export class ProjectRepository implements IProjectRepository {
  async create(project: Omit<Project, 'id'>): Promise<Project> {
    const [result] = await db('projects')
      .insert({
        team_id: project.teamId,
        name: project.name,
        description: project.description,
        status: project.status,
        start_date: project.startDate,
        end_date: project.endDate,
        created_at: project.createdAt,
        updated_at: project.updatedAt,
      })
      .returning('*');
    
    return {
      id: result.id,
      teamId: result.team_id,
      name: result.name,
      description: result.description,
      status: result.status,
      startDate: result.start_date,
      endDate: result.end_date,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async findById(id: string): Promise<Project | null> {
    const result = await db('projects').where({ id }).first();
    if (!result) return null;

    return {
      id: result.id,
      teamId: result.team_id,
      name: result.name,
      description: result.description,
      status: result.status,
      startDate: result.start_date,
      endDate: result.end_date,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async findByTeamId(teamId: string): Promise<Project[]> {
    const results = await db('projects').where({ team_id: teamId });
    return results.map(result => ({
      id: result.id,
      teamId: result.team_id,
      name: result.name,
      description: result.description,
      status: result.status,
      startDate: result.start_date,
      endDate: result.end_date,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    }));
  }

  async update(id: string, data: Partial<Omit<Project, 'id'>>): Promise<Project | null> {
    const [result] = await db('projects')
      .where({ id })
      .update({
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status && { status: data.status }),
        ...(data.startDate !== undefined && { start_date: data.startDate }),
        ...(data.endDate !== undefined && { end_date: data.endDate }),
        ...(data.updatedAt && { updated_at: data.updatedAt }),
      })
      .returning('*');
    
    if (!result) return null;

    return {
      id: result.id,
      teamId: result.team_id,
      name: result.name,
      description: result.description,
      status: result.status,
      startDate: result.start_date,
      endDate: result.end_date,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async delete(id: string): Promise<boolean> {
    const result = await db('projects').where({ id }).delete();
    return result > 0;
  }
}
