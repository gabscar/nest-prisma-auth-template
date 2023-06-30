import { ApiException } from '@app/exceptions/api.exception';
import { Either } from '@src/shared/either';
import { IAbstractService } from '../../baseAbstract.service';
import { IValidationCodeCreateParams } from '@domain/interfaces/validationCode/create.interface';
import { ValidationCodeEntity } from '@domain/entities/validationCode.entity';

export type IOutputCreateValidationCodeService = Either<
  ApiException,
  ValidationCodeEntity
>;

export type ICreateValidationCodeEntityService = IAbstractService<
  Partial<IValidationCodeCreateParams>,
  IOutputCreateValidationCodeService
>;
