export class Team {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    workspaceId: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;
    this.workspaceId = data.workspaceId;
    this.name = data.name;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
