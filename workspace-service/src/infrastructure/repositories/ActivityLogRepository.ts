import { IActivityLogRepository } from '../../domain/interfaces/IActivityLogRepository';
import { ActivityLog } from '../../domain/entities/ActivityLog';
import db from '../database/connection';

export class ActivityLogRepository implements IActivityLogRepository {
  async create(log: Omit<ActivityLog, 'id'>): Promise<ActivityLog> {
    const [result] = await db('activity_logs')
      .insert({
        workspace_id: log.workspaceId,
        user_id: log.userId,
        action: log.action,
        entity_type: log.entityType,
        entity_id: log.entityId,
        metadata: log.metadata ? JSON.stringify(log.metadata) : null,
        created_at: log.createdAt,
      })
      .returning('*');
    
    return {
      id: result.id,
      workspaceId: result.workspace_id,
      userId: result.user_id,
      action: result.action,
      entityType: result.entity_type,
      entityId: result.entity_id,
      metadata: result.metadata,
      createdAt: result.created_at,
    };
  }

  async findById(id: string): Promise<ActivityLog | null> {
    const result = await db('activity_logs').where({ id }).first();
    if (!result) return null;

    return {
      id: result.id,
      workspaceId: result.workspace_id,
      userId: result.user_id,
      action: result.action,
      entityType: result.entity_type,
      entityId: result.entity_id,
      metadata: result.metadata,
      createdAt: result.created_at,
    };
  }

  async findByWorkspaceId(workspaceId: string, limit: number = 50): Promise<ActivityLog[]> {
    const results = await db('activity_logs')
      .where({ workspace_id: workspaceId })
      .orderBy('created_at', 'desc')
      .limit(limit);
    
    return results.map(result => ({
      id: result.id,
      workspaceId: result.workspace_id,
      userId: result.user_id,
      action: result.action,
      entityType: result.entity_type,
      entityId: result.entity_id,
      metadata: result.metadata,
      createdAt: result.created_at,
    }));
  }

  async findByUserId(userId: string, limit: number = 50): Promise<ActivityLog[]> {
    const results = await db('activity_logs')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc')
      .limit(limit);
    
    return results.map(result => ({
      id: result.id,
      workspaceId: result.workspace_id,
      userId: result.user_id,
      action: result.action,
      entityType: result.entity_type,
      entityId: result.entity_id,
      metadata: result.metadata,
      createdAt: result.created_at,
    }));
  }
}
