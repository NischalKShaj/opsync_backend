export class Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    name: string;
    description?: string;
    resource: string;
    action: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.resource = data.resource;
    this.action = data.action;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
