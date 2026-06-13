export class ActivityLog {
  id: string;
  workspaceId: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, any>;
  createdAt: Date;

  constructor(data: {
    id: string;
    workspaceId: string;
    userId: string;
    action: string;
    entityType: string;
    entityId: string;
    metadata?: Record<string, any>;
    createdAt: Date;
  }) {
    this.id = data.id;
    this.workspaceId = data.workspaceId;
    this.userId = data.userId;
    this.action = data.action;
    this.entityType = data.entityType;
    this.entityId = data.entityId;
    this.metadata = data.metadata;
    this.createdAt = data.createdAt;
  }
}
