import { ActivityLog } from '../entities/ActivityLog';

export interface IActivityLogRepository {
  create(log: Omit<ActivityLog, 'id'>): Promise<ActivityLog>;
  findById(id: string): Promise<ActivityLog | null>;
  findByWorkspaceId(workspaceId: string, limit?: number): Promise<ActivityLog[]>;
  findByUserId(userId: string, limit?: number): Promise<ActivityLog[]>;
}
