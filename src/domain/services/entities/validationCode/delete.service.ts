import { ApiException } from '@app/exceptions/api.exception';
import { Either } from '@src/shared/either';
import { IAbstractService } from '../../baseAbstract.service';

export type IOutputDeleteValidationCodeService = Either<ApiException, void>;

export type IDeleteValidationCodeEntityService = IAbstractService<
  string,
  IOutputDeleteValidationCodeService
>;
