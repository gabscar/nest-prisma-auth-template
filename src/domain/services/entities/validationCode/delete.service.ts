import { IError } from '@src/shared/IError';
import { Either } from '@src/shared/either';
import { IAbstractService } from '../../baseAbstract.service';

export type IOutputDeleteValidationCodeService = Either<IError, void>;

export type IDeleteValidationCodeEntityService = IAbstractService<
  string,
  IOutputDeleteValidationCodeService
>;
