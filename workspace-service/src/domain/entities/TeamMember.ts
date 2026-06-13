export class TeamMember {
  id: string;
  teamId: string;
  userId: string;
  roleId: string;
  joinedAt: Date;

  constructor(data: {
    id: string;
    teamId: string;
    userId: string;
    roleId: string;
    joinedAt: Date;
  }) {
    this.id = data.id;
    this.teamId = data.teamId;
    this.userId = data.userId;
    this.roleId = data.roleId;
    this.joinedAt = data.joinedAt;
  }
}
