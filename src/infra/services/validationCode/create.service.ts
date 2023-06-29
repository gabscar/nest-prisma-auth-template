import { Inject } from '@nestjs/common';
import { right, left } from '@src/shared/either';
import { INJECTION_REPOSITORY_VALIDATION_CODE } from '@domain/constants/injections/user.constant';
import {
  ICreateValidationCodeEntityService,
  IOutputCreateValidationCodeService,
} from '@domain/services/entities/validationCode/create.service';
import { IValidationCodeCreateParams } from '@domain/interfaces/validationCode/create.interface';
import { IValidationCodeRepositoryDatabase } from '@domain/repositories/validationCode.repository';
import { ValidationCodeError } from '@domain/errors/validationCode/validationCodeError';
import { randomInt } from 'crypto';

export class CreateValidationCodeService
  implements ICreateValidationCodeEntityService
{
  constructor(
    @Inject(INJECTION_REPOSITORY_VALIDATION_CODE)
    private readonly validationCodeRepository: IValidationCodeRepositoryDatabase,
  ) {}

  async execute(
    params: IValidationCodeCreateParams,
  ): Promise<IOutputCreateValidationCodeService> {
    try {
      const oneHourMoreThanNow = new Date().getTime() + 1000 * 60 * 60;

      const validationCodeEntity = await this.validationCodeRepository.create({
        code: this.generateNewCode(),
        exp: new Date(oneHourMoreThanNow),
        type: params.type,
        userId: params.userId,
      });

      return right(validationCodeEntity);
    } catch (err) {
      console.log(err);
      return left(ValidationCodeError.tokenCreationError());
    }
  }
  private generateNewCode(): string {
    const min = 100;
    const max = 1000000;
    return randomInt(min, max).toString().padStart(6, '0');
  }
}
