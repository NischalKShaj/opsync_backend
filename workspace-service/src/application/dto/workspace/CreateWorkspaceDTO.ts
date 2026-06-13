export class CreateWorkspaceDTO {
  name: string;
  description?: string;
  ownerId: string;

  constructor(data: { name: string; description?: string; ownerId: string }) {
    this.name = data.name;
    this.description = data.description;
    this.ownerId = data.ownerId;
  }
}
