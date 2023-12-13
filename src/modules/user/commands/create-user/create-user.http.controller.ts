import {
  Body,
  ConflictException as ConflictHttpException,
  Controller,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { match, Result } from 'oxide.ts';
import { CreateUserRequestDto } from './create-user.request.dto';
import { UserAlreadyExistsError } from '@modules/user/domain/user.errors';
import { USER_SERVICE } from '../../user.di-tokens';
import { CreateUserService } from './create-user.service';
import { AggregateID } from '@src/libs/domain';
import { IdResponse, ApiErrorResponse } from '@src/libs/api';

@Controller(routesV1.version)
export class CreateUserHttpController {
  constructor(
    @Inject(USER_SERVICE)
    protected readonly createUserService: CreateUserService,
  ) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: UserAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.user.root)
  async create(@Body() body: CreateUserRequestDto): Promise<IdResponse> {
    const result: Result<AggregateID, UserAlreadyExistsError> =
      await this.createUserService.execute(body);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof UserAlreadyExistsError)
          throw new ConflictHttpException(error.message);
        throw error;
      },
    });
  }
}
