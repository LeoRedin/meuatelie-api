import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { UserRepositoryPort } from './user.repository.port';
import { Option } from 'oxide.ts';
import { UserEntity } from '../domain/user.entity';

export const userSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  email: z.string().email(),
  password: z.string(),
});

export type UserModel = z.TypeOf<typeof userSchema>;

@Injectable()
export class UserRepository implements UserRepositoryPort {
  insert(entity: UserEntity | UserEntity[]): Promise<void> {
    return this.insert(entity);
  }
  findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.findOneByEmail(email);
  }
  findOneById(id: string): Promise<Option<UserEntity>> {
    return this.findOneById(id);
  }
  findAll(): Promise<UserEntity[]> {
    return this.findAll();
  }
  delete(entity: UserEntity): Promise<boolean> {
    return this.delete(entity);
  }
}
