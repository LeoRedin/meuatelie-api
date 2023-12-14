import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { UserRepositoryPort } from './user.repository.port';
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
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}
  insert(entity: UserEntity | UserEntity[]): Promise<InsertResult> {
    return this.userEntityRepository.insert(entity);
  }
  findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.userEntityRepository.findOne({
      where: {
        email,
      },
    });
  }
  findOneById(id: string): Promise<UserEntity | null> {
    return this.userEntityRepository.findOneBy({ id });
  }
  findAll(): Promise<UserEntity[]> {
    return this.userEntityRepository.find();
  }
  delete(entity: UserEntity): Promise<DeleteResult> {
    return this.userEntityRepository.delete({ id: entity.id });
  }
}
