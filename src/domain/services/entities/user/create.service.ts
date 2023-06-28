import { UserEntity } from '@domain/entities/user.entity';
import { ICreateUserInput } from '@domain/interfaces/user/create.interface';
import { IError } from '@src/shared/IError';
import { Either } from '@src/shared/either';
import { IAbstractService } from '../../baseAbstract.service';

export type IOutputCreateUserService = Either<IError, UserEntity>;

export type ICreateUserEntityService = IAbstractService<
  ICreateUserInput,
  IOutputCreateUserService
>;
