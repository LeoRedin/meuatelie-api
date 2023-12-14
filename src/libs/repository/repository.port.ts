import { DeleteResult, InsertResult } from 'typeorm';

export interface RepositoryPort<Entity> {
  insert(entity: Entity | Entity[]): Promise<InsertResult>;
  findOneById(id: string): Promise<Entity | null>;
  findAll(): Promise<Entity[]>;
  delete(entity: Entity): Promise<DeleteResult>;
}
