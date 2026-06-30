export class WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  roleId: string;
  joinedAt: Date;

  constructor(data: {
    id: string;
    workspaceId: string;
    userId: string;
    roleId: string;
    joinedAt: Date;
  }) {
    this.id = data.id;
    this.workspaceId = data.workspaceId;
    this.userId = data.userId;
    this.roleId = data.roleId;
    this.joinedAt = data.joinedAt;
  }
}
