import { Request, Response } from 'express';
import { CreateProject } from '../../../application/use-cases/project/CreateProject';
import { CreateProjectDTO } from '../../../application/dto/project/CreateProjectDTO';

export class ProjectController {
  constructor(private createProject: CreateProject) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = new CreateProjectDTO(req.body);
      const userId = req.headers['user-id'] as string;
      
      const project = await this.createProject.execute(dto, userId);
      
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create project' });
    }
  }
}
