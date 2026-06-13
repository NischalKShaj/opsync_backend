import { Project } from '../entities/Project';

export interface IProjectRepository {
  create(project: Omit<Project, 'id'>): Promise<Project>;
  findById(id: string): Promise<Project | null>;
  findByTeamId(teamId: string): Promise<Project[]>;
  update(id: string, data: Partial<Omit<Project, 'id'>>): Promise<Project | null>;
  delete(id: string): Promise<boolean>;
}
