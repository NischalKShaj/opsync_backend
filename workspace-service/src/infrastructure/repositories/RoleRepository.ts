import { IRoleRepository } from '../../domain/interfaces/IRoleRepository';
import { Role } from '../../domain/entities/Role';
import db from '../database/connection';

export class RoleRepository implements IRoleRepository {
  async create(role: Omit<Role, 'id'>): Promise<Role> {
    const [result] = await db('roles')
      .insert({
        name: role.name,
        description: role.description,
        permissions: JSON.stringify(role.permissions),
        is_system_role: role.isSystemRole,
        created_at: role.createdAt,
        updated_at: role.updatedAt,
      })
      .returning('*');
    
    return {
      id: result.id,
      name: result.name,
      description: result.description,
      permissions: result.permissions,
      isSystemRole: result.is_system_role,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async findById(id: string): Promise<Role | null> {
    const result = await db('roles').where({ id }).first();
    if (!result) return null;

    return {
      id: result.id,
      name: result.name,
      description: result.description,
      permissions: result.permissions,
      isSystemRole: result.is_system_role,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async findByName(name: string): Promise<Role | null> {
    const result = await db('roles').where({ name }).first();
    if (!result) return null;

    return {
      id: result.id,
      name: result.name,
      description: result.description,
      permissions: result.permissions,
      isSystemRole: result.is_system_role,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async findAll(): Promise<Role[]> {
    const results = await db('roles');
    return results.map(result => ({
      id: result.id,
      name: result.name,
      description: result.description,
      permissions: result.permissions,
      isSystemRole: result.is_system_role,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    }));
  }

  async update(id: string, data: Partial<Omit<Role, 'id'>>): Promise<Role | null> {
    const [result] = await db('roles')
      .where({ id })
      .update({
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.permissions && { permissions: JSON.stringify(data.permissions) }),
        ...(data.isSystemRole !== undefined && { is_system_role: data.isSystemRole }),
        ...(data.updatedAt && { updated_at: data.updatedAt }),
      })
      .returning('*');
    
    if (!result) return null;

    return {
      id: result.id,
      name: result.name,
      description: result.description,
      permissions: result.permissions,
      isSystemRole: result.is_system_role,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async delete(id: string): Promise<boolean> {
    const result = await db('roles').where({ id }).delete();
    return result > 0;
  }
}
