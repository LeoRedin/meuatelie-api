import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { UserRepository } from './repository/user.repository';
import { USER_REPOSITORY, USER_SERVICE } from './user.di-tokens';
import { CreateUserService } from './commands/create-user/create-user.service';

const httpControllers = [CreateUserHttpController];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];
const services: Provider[] = [
  { provide: USER_SERVICE, useClass: CreateUserService },
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [...httpControllers],
  providers: [...repositories, ...services],
})
export class UserModule {}
