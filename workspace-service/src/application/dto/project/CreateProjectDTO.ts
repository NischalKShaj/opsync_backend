export class CreateProjectDTO {
  teamId: string;
  name: string;
  description?: string;
  status?: 'active' | 'archived' | 'completed';
  startDate?: Date;
  endDate?: Date;

  constructor(data: {
    teamId: string;
    name: string;
    description?: string;
    status?: 'active' | 'archived' | 'completed';
    startDate?: Date;
    endDate?: Date;
  }) {
    this.teamId = data.teamId;
    this.name = data.name;
    this.description = data.description;
    this.status = data.status || 'active';
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
}
