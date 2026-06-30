export class CreateTeamDTO {
  workspaceId: string;
  name: string;
  description?: string;

  constructor(data: { workspaceId: string; name: string; description?: string }) {
    this.workspaceId = data.workspaceId;
    this.name = data.name;
    this.description = data.description;
  }
}
