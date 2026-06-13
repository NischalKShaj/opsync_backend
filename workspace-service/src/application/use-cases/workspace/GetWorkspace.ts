import { IWorkspaceRepository } from '../../../domain/interfaces/IWorkspaceRepository';
import { Workspace } from '../../../domain/entities/Workspace';

export class GetWorkspace {
  constructor(private workspaceRepository: IWorkspaceRepository) {}

  async execute(id: string): Promise<Workspace | null> {
    return await this.workspaceRepository.findById(id);
  }
}
