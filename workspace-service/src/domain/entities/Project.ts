export class Project {
  id: string;
  teamId: string;
  name: string;
  description?: string;
  status: 'active' | 'archived' | 'completed';
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    teamId: string;
    name: string;
    description?: string;
    status: 'active' | 'archived' | 'completed';
    startDate?: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;
    this.teamId = data.teamId;
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
