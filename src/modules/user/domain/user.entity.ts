import { Entity as TypeOrmEntity, Column, PrimaryColumn } from 'typeorm';
import { UserProps, CreateUserProps } from './user.types';
import { AggregateID, Entity } from '@src/libs/domain';

@TypeOrmEntity()
export class UserEntity extends Entity<UserProps> {
  @PrimaryColumn()
  protected readonly _id: AggregateID;

  @Column()
  email: string;

  @Column()
  password: string;

  static create(create: CreateUserProps): UserEntity {
    const id = crypto.randomUUID();
    const props: UserProps = { ...create };
    const user = new UserEntity({ id, props });

    return user;
  }

  public validate(): void {
    throw new Error('UserEntity => validate() => Method not implemented.');
  }
}
