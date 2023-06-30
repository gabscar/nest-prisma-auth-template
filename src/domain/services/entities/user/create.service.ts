import { UserEntity } from '@domain/entities/user.entity';
import { ICreateUserInput } from '@domain/interfaces/user/create.interface';
import { ApiException } from '@app/exceptions/api.exception';
import { Either } from '@src/shared/either';
import { IAbstractService } from '../../baseAbstract.service';

export type IOutputCreateUserService = Either<ApiException, UserEntity>;

export type ICreateUserEntityService = IAbstractService<
  ICreateUserInput,
  IOutputCreateUserService
>;
