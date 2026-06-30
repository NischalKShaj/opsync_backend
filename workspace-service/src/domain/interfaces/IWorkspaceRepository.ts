import { Workspace } from '../entities/Workspace';
import { WorkspaceMember } from '../entities/WorkspaceMember';

export interface IWorkspaceRepository {
  create(workspace: Omit<Workspace, 'id'>): Promise<Workspace>;
  findById(id: string): Promise<Workspace | null>;
  findByOwnerId(ownerId: string): Promise<Workspace[]>;
  update(id: string, data: Partial<Omit<Workspace, 'id'>>): Promise<Workspace | null>;
  delete(id: string): Promise<boolean>;
  addMember(member: Omit<WorkspaceMember, 'id' | 'joinedAt'>): Promise<WorkspaceMember>;
  removeMember(workspaceId: string, userId: string): Promise<boolean>;
  getMembers(workspaceId: string): Promise<WorkspaceMember[]>;
  isMember(workspaceId: string, userId: string): Promise<boolean>;
}
