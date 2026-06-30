import { IWorkspaceRepository } from '../../domain/interfaces/IWorkspaceRepository';
import { Workspace } from '../../domain/entities/Workspace';
import { WorkspaceMember } from '../../domain/entities/WorkspaceMember';
import db from '../database/connection';

export class WorkspaceRepository implements IWorkspaceRepository {
  // create the workspace
  async create(workspace: Omit<Workspace, 'id'>): Promise<Workspace> {
    const existingWorkspace = await db('workspaces')
    .where({
      name: workspace.name,
      owner_id: workspace.ownerId
    })
    .first();

  if (existingWorkspace) {
    // Throw a specific error your HTTP layer can catch
    throw new Error('Workspace with this name already exists for this user');
  }
    
    const [result] = await db('workspaces')
      .insert({
        name: workspace.name,
        description: workspace.description,
        owner_id: workspace.ownerId,
        created_at: workspace.createdAt,
        updated_at: workspace.updatedAt,
      })
      .returning('*');
    
    return {
      id: result.id,
      name: result.name,
      description: result.description,
      ownerId: result.owner_id,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async findById(id: string): Promise<Workspace | null> {
    const result = await db('workspaces').where({ id }).first();
    if (!result) return null;

    return {
      id: result.id,
      name: result.name,
      description: result.description,
      ownerId: result.owner_id,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async findByOwnerId(ownerId: string): Promise<Workspace[]> {
    const results = await db('workspaces').where({ owner_id: ownerId });
    return results.map(result => ({
      id: result.id,
      name: result.name,
      description: result.description,
      ownerId: result.owner_id,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    }));
  }

  async update(id: string, data: Partial<Omit<Workspace, 'id'>>): Promise<Workspace | null> {
    const [result] = await db('workspaces')
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
      name: result.name,
      description: result.description,
      ownerId: result.owner_id,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async delete(id: string): Promise<boolean> {
    const result = await db('workspaces').where({ id }).delete();
    return result > 0;
  }

  async addMember(member: Omit<WorkspaceMember, 'id' | 'joinedAt'>): Promise<WorkspaceMember> {
    const [result] = await db('workspace_members')
      .insert({
        workspace_id: member.workspaceId,
        user_id: member.userId,
        role_id: member.roleId,
        joined_at: new Date(),
      })
      .returning('*');
    
    return {
      id: result.id,
      workspaceId: result.workspace_id,
      userId: result.user_id,
      roleId: result.role_id,
      joinedAt: result.joined_at,
    };
  }

  async removeMember(workspaceId: string, userId: string): Promise<boolean> {
    const result = await db('workspace_members')
      .where({ workspace_id: workspaceId, user_id: userId })
      .delete();
    return result > 0;
  }

  async getMembers(workspaceId: string): Promise<WorkspaceMember[]> {
    const results = await db('workspace_members').where({ workspace_id: workspaceId });
    return results.map(result => ({
      id: result.id,
      workspaceId: result.workspace_id,
      userId: result.user_id,
      roleId: result.role_id,
      joinedAt: result.joined_at,
    }));
  }

  async isMember(workspaceId: string, userId: string): Promise<boolean> {
    const result = await db('workspace_members')
      .where({ workspace_id: workspaceId, user_id: userId })
      .first();
    return !!result;
  }
}
