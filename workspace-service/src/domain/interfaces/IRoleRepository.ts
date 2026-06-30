import { Role } from '../entities/Role';

export interface IRoleRepository {
  create(role: Omit<Role, 'id'>): Promise<Role>;
  findById(id: string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  update(id: string, data: Partial<Omit<Role, 'id'>>): Promise<Role | null>;
  delete(id: string): Promise<boolean>;
}
