export class Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  isSystemRole: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    name: string;
    description?: string;
    permissions: string[];
    isSystemRole: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.permissions = data.permissions;
    this.isSystemRole = data.isSystemRole;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
