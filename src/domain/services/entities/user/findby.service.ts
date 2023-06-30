import { IUserRelations, UserEntity } from '@domain/entities/user.entity';
import { IUseCaseOptions } from '@domain/interfaces/common/useCaseOptions.interface';
import { ApiException } from '@app/exceptions/api.exception';
import { Either } from '@src/shared/either';
import { IAbstractService } from '../../baseAbstract.service';

type UserEntityFindByParams = Pick<UserEntity, 'id' | 'name' | 'email'>;

export type IInputFindByUserService = IUseCaseOptions<
  keyof UserEntityFindByParams,
  string,
  IUserRelations
>;

export type IOutputFindByUserService = Either<ApiException, UserEntity>;

export type IFindByUserEntityService = IAbstractService<
  IInputFindByUserService,
  IOutputFindByUserService
>;
