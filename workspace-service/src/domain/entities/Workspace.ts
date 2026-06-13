export class Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    name: string;
    description?: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.ownerId = data.ownerId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
