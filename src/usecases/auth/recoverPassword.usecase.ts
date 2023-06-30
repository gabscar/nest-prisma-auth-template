import { Inject } from '@nestjs/common';
import { IAuthRecoverPasswordParams } from '@domain/interfaces/auth/recoverPassword.interface';
import { IAuthRecoverPasswordUseCase } from '@domain/usecases/auth/recoverPassword.usecase';
import { ForgotError } from '@domain/errors/auth/forgotError';
import { UsersErrors } from '@domain/errors/user/userError';
import { AuthService } from '@infra/services/auth/auth.service';
import { ValidationCodeEntity } from '@domain/entities/validationCode.entity';
import { IAuthService } from '@domain/services/auth/auth.service';
import {
  INJECTION_SERVICE_FINDBY_USER,
  INJECTION_SERVICE_UPDATE_USER,
} from '@domain/constants/injections/user.constant';
import { IFindByUserEntityService } from '@domain/services/entities/user/findby.service';
import { IUpdateUserEntityService } from '@domain/services/entities/user/update.service';
import { IDeleteValidationCodeEntityService } from '@domain/services/entities/validationCode/delete.service';
import { IFindValidationCodeEntityService } from '@domain/services/entities/validationCode/find.service';
import { ValidationCodeError } from '@domain/errors/validationCode/validationCodeError';
import {
  INJECTION_SERVICE_DELETE_VALIDATION_CODE,
  INJECTION_SERVICE_FINDBY_VALIDATION_CODE,
} from '@domain/constants/injections/validationCode.constant';
import { INJECTION_SERVICE_AUTH } from '@domain/constants/injections/auth.constant';

export class AuthRecoverPasswordUseCase implements IAuthRecoverPasswordUseCase {
  constructor(
    @Inject(INJECTION_SERVICE_AUTH)
    private readonly authService: IAuthService,
    @Inject(INJECTION_SERVICE_FINDBY_USER)
    private readonly findUserService: IFindByUserEntityService,
    @Inject(INJECTION_SERVICE_FINDBY_VALIDATION_CODE)
    private readonly findValidationCodeService: IFindValidationCodeEntityService,
    @Inject(INJECTION_SERVICE_DELETE_VALIDATION_CODE)
    private readonly deleteValidationCodeService: IDeleteValidationCodeEntityService,
    @Inject(INJECTION_SERVICE_UPDATE_USER)
    private readonly updateUserService: IUpdateUserEntityService,
  ) {}

  async execute(params: IAuthRecoverPasswordParams): Promise<void> {
    const validationCode = await this.validateParams(params);

    const hashedPassword = await this.hashPassword(params.newPassword);

    await this.updateUserService.execute({
      where: { column: 'id', value: validationCode.userId },
      data: {
        password: hashedPassword,
      },
    });

    await this.deleteValidationCodeService.execute(validationCode.id);
  }

  private async validateParams(
    params: IAuthRecoverPasswordParams,
  ): Promise<ValidationCodeEntity> {
    if (params.newPassword !== params.confirmationPassword) {
      throw ForgotError.notMatch();
    }

    const validationCode = await this.findValidationCodeService.execute(
      params.validationCodeId,
    );

    if (validationCode.isLeft()) {
      throw validationCode.value;
    }

    if (validationCode.value.isExpired()) {
      throw ValidationCodeError.tokenExpiredError();
    }

    const validationCodeMatchs = await this.authService.compare(
      validationCode.value.code,
      params.code,
    );
    if (!validationCodeMatchs) {
      throw ValidationCodeError.invalidTokenError();
    }

    const user = await this.findUserService.execute({
      filters: {
        where: {
          AND: [{ column: 'id', value: validationCode.value.userId }],
        },
      },
    });
    if (!user) {
      throw UsersErrors.notFound();
    }

    return validationCode.value;
  }

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await this.authService.hash(password);
    if (!hashedPassword) {
      throw ForgotError.hashError();
    }
    return hashedPassword;
  }
}
