import { Inject } from '@nestjs/common';
import { right, left } from '@src/shared/either';
import { INJECTION_REPOSITORY_VALIDATION_CODE } from '@domain/constants/injections/user.constant';

import { IValidationCodeRepositoryDatabase } from '@domain/repositories/validationCode.repository';

import {
  IDeleteValidationCodeEntityService,
  IOutputDeleteValidationCodeService,
} from '@domain/services/entities/validationCode/delete.service';
import { ValidationCodeError } from '@domain/errors/validationCode/validationCodeError';

export class DeleteValidationCodeService
  implements IDeleteValidationCodeEntityService
{
  constructor(
    @Inject(INJECTION_REPOSITORY_VALIDATION_CODE)
    private readonly validationCodeRepository: IValidationCodeRepositoryDatabase,
  ) {}

  async execute(params: string): Promise<IOutputDeleteValidationCodeService> {
    try {
      const validationCode = await this.validationCodeRepository.delete(params);

      return right(validationCode);
    } catch (err) {
      return left(ValidationCodeError.deleteToken());
    }
  }
}
