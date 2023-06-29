import { Inject } from '@nestjs/common';
import { right, left } from '@src/shared/either';
import { INJECTION_REPOSITORY_VALIDATION_CODE } from '@domain/constants/injections/user.constant';

import { IValidationCodeRepositoryDatabase } from '@domain/repositories/validationCode.repository';
import {
  IFindValidationCodeEntityService,
  IOutputFindValidationCodeService,
} from '@domain/services/entities/validationCode/find.service';
import { ValidationCodeError } from '@domain/errors/validationCode/validationCodeError';

export class FindValidationCodeService
  implements IFindValidationCodeEntityService
{
  constructor(
    @Inject(INJECTION_REPOSITORY_VALIDATION_CODE)
    private readonly validationCodeRepository: IValidationCodeRepositoryDatabase,
  ) {}

  async execute(params: string): Promise<IOutputFindValidationCodeService> {
    try {
      const validationCode = await this.validationCodeRepository.findById(
        params,
      );

      return right(validationCode);
    } catch (err) {
      return left(ValidationCodeError.notFoundToken());
    }
  }
}
