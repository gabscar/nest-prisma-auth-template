import { UserEntity } from '@domain/entities/user.entity';
import { ApiException } from '@app/exceptions/api.exception';
import { Either } from '@src/shared/either';
import { IAbstractService } from '../../baseAbstract.service';
import { IUpdateUserInput } from '@domain/interfaces/user/update.interface';
import { updateWhereUser } from '@domain/repositories/user.repository';

export interface IInputUpdateUserService {
  where: updateWhereUser;
  data: IUpdateUserInput;
}

export type IOutputUpdateUserService = Either<ApiException, UserEntity>;

export type IUpdateUserEntityService = IAbstractService<
  IInputUpdateUserService,
  IOutputUpdateUserService
>;
