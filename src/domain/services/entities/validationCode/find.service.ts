import { ApiException } from '@app/exceptions/api.exception';
import { Either } from '@src/shared/either';
import { IAbstractService } from '../../baseAbstract.service';
import { ValidationCodeEntity } from '@domain/entities/validationCode.entity';

export type IOutputFindValidationCodeService = Either<
  ApiException,
  ValidationCodeEntity
>;

export type IFindValidationCodeEntityService = IAbstractService<
  string,
  IOutputFindValidationCodeService
>;
