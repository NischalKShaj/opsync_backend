import { Request, Response } from 'express';
import { CreateTeam } from '../../../application/use-cases/team/CreateTeam';
import { CreateTeamDTO } from '../../../application/dto/team/CreateTeamDTO';

export class TeamController {
  constructor(private createTeam: CreateTeam) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = new CreateTeamDTO(req.body);
      const userId = req.headers['user-id'] as string;
      
      const team = await this.createTeam.execute(dto, userId);
      
      res.status(201).json(team);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create team' });
    }
  }
}
