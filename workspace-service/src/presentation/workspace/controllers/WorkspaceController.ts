import { Request, Response } from 'express';
import { CreateWorkspace } from '../../../application/use-cases/workspace/CreateWorkspace';
import { GetWorkspace } from '../../../application/use-cases/workspace/GetWorkspace';
import { UpdateWorkspace } from '../../../application/use-cases/workspace/UpdateWorkspace';
import { DeleteWorkspace } from '../../../application/use-cases/workspace/DeleteWorkspace';
import { ListWorkspaces } from '../../../application/use-cases/workspace/ListWorkspaces';
import { AddMember as AddMemberUseCase } from '../../../application/use-cases/workspace/AddMember';
import { CreateWorkspaceDTO } from '../../../application/dto/workspace/CreateWorkspaceDTO';
import { UpdateWorkspaceDTO } from '../../../application/dto/workspace/UpdateWorkspaceDTO';
import { AddMemberDTO } from '../../../application/dto/workspace/AddMemberDTO';
import { WorkspaceResponseDTO } from '../../../application/dto/workspace/WorkspaceResponseDTO';

export class WorkspaceController {
  constructor(
    private createWorkspace: CreateWorkspace,
    private getWorkspace: GetWorkspace,
    private updateWorkspace: UpdateWorkspace,
    private deleteWorkspace: DeleteWorkspace,
    private listWorkspaces: ListWorkspaces,
    private addMemberUseCase: AddMemberUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = new CreateWorkspaceDTO(req.body);
      const userId = Array.isArray(req.headers['user-id']) ? req.headers['user-id'][0] : req.headers['user-id'] as string;
      
      const workspace = await this.createWorkspace.execute(dto);
      
      const response = new WorkspaceResponseDTO(workspace);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create workspace' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const workspace = await this.getWorkspace.execute(id);
      
      if (!workspace) {
        res.status(404).json({ error: 'Workspace not found' });
        return;
      }
      
      const response = new WorkspaceResponseDTO(workspace);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get workspace' });
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const userId = Array.isArray(req.headers['user-id']) ? req.headers['user-id'][0] : req.headers['user-id'] as string;
      const workspaces = await this.listWorkspaces.execute(userId);
      
      const response = workspaces.map(w => new WorkspaceResponseDTO(w));
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to list workspaces' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const dto = new UpdateWorkspaceDTO(req.body);
      const userId = Array.isArray(req.headers['user-id']) ? req.headers['user-id'][0] : req.headers['user-id'] as string;
      
      const workspace = await this.updateWorkspace.execute(id, dto, userId);
      
      if (!workspace) {
        res.status(404).json({ error: 'Workspace not found' });
        return;
      }
      
      const response = new WorkspaceResponseDTO(workspace);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update workspace' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = Array.isArray(req.headers['user-id']) ? req.headers['user-id'][0] : req.headers['user-id'] as string;
      
      const deleted = await this.deleteWorkspace.execute(id, userId);
      
      if (!deleted) {
        res.status(404).json({ error: 'Workspace not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete workspace' });
    }
  }

  async addMember(req: Request, res: Response): Promise<void> {
    try {
      const dto = new AddMemberDTO(req.body);
      const addedByUserId = Array.isArray(req.headers['user-id']) ? req.headers['user-id'][0] : req.headers['user-id'] as string;
      
      const member = await this.addMemberUseCase.execute(dto, addedByUserId);
      
      res.status(201).json(member);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add member' });
    }
  }
}
