import { Request, Response } from 'express';
import { CreateTask } from '../../../application/use-cases/task/CreateTask';
import { CreateTaskDTO } from '../../../application/dto/task/CreateTaskDTO';

export class TaskController {
  constructor(private createTask: CreateTask) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = new CreateTaskDTO(req.body);
      const userId = req.headers['user-id'] as string;
      
      const task = await this.createTask.execute(dto, userId);
      
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }
}
