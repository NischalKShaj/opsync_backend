import { IWorkspaceRepository } from '../../../domain/interfaces/IWorkspaceRepository';
import { Workspace } from '../../../domain/entities/Workspace';

export class ListWorkspaces {
  constructor(private workspaceRepository: IWorkspaceRepository) {}

  async execute(ownerId: string): Promise<Workspace[]> {
    return await this.workspaceRepository.findByOwnerId(ownerId);
  }
}
