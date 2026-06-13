export class AddMemberDTO {
  workspaceId: string;
  userId: string;
  roleId: string;

  constructor(data: { workspaceId: string; userId: string; roleId: string }) {
    this.workspaceId = data.workspaceId;
    this.userId = data.userId;
    this.roleId = data.roleId;
  }
}
