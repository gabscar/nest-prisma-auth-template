import { IError } from '@src/shared/IError';
import { Either } from '@src/shared/either';
import { IAbstractService } from '../../baseAbstract.service';
import { ValidationCodeEntity } from '@domain/entities/validationCode.entity';

export type IOutputFindValidationCodeService = Either<
  IError,
  ValidationCodeEntity
>;

export type IFindValidationCodeEntityService = IAbstractService<
  string,
  IOutputFindValidationCodeService
>;
