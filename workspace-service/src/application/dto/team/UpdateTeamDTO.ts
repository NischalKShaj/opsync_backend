export class UpdateTeamDTO {
  name?: string;
  description?: string;

  constructor(data: { name?: string; description?: string }) {
    this.name = data.name;
    this.description = data.description;
  }
}
