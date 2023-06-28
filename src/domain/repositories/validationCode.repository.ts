import { ValidationCodeEntity } from '@domain/entities/validationCode.entity';
import { IValidationCodeCreateParams } from '@domain/interfaces/validationCode/create.interface';

export abstract class IValidationCodeRepositoryDatabase {
  findById: (id: string) => Promise<ValidationCodeEntity>;
  create: (
    payload: IValidationCodeCreateParams,
  ) => Promise<ValidationCodeEntity>;
  delete: (id: string) => Promise<void>;
}
