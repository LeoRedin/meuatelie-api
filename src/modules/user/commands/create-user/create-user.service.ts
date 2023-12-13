import { ConflictException, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../user.di-tokens';
import { UserRepositoryPort } from '../../repository/user.repository.port';
import { Err, Ok, Result } from 'oxide.ts';
import { AggregateID } from '@src/libs/domain';
import { CreateUserRequestDto } from './create-user.request.dto';
import { UserAlreadyExistsError } from '../../domain/user.errors';
import { UserEntity } from '../../domain/user.entity';

export class CreateUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(
    createUserRequestDTO: CreateUserRequestDto,
  ): Promise<Result<AggregateID, UserAlreadyExistsError>> {
    const user = UserEntity.create({
      email: createUserRequestDTO.email,
      password: createUserRequestDTO.password,
    });

    try {
      await this.userRepo.insert(user);
      return Ok(user.id);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new UserAlreadyExistsError(error));
      }
      throw error;
    }
  }
}
