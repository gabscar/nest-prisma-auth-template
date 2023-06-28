import { IError } from '@src/shared/IError';
import { Either } from '@src/shared/either';
import { IAbstractService } from '../baseAbstract.service';
import { IValidationCodeCreateParams } from '@domain/interfaces/validationCode/create.interface';
import { ValidationCodeEntity } from '@domain/entities/validationCode.entity';

export type IOutputCreateValidationCodeService = Either<
  IError,
  ValidationCodeEntity
>;

export type ICreateValidationCodeEntityService = IAbstractService<
  IValidationCodeCreateParams,
  IOutputCreateValidationCodeService
>;
