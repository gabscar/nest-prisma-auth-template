import {
  INJECTION_SERVICE_AUTH,
  INJECTION_SERVICE_FINDBY_USER,
} from '@domain/constants/injections/user.constant';
import { UserEntity } from '@domain/entities/user.entity';
import { UsersErrors } from '@domain/errors/user/userError';
import { IAuthLoginResponse } from '@domain/interfaces/auth/auth.interface';
import { IAuthService } from '@domain/services/auth/auth.service';
import { IFindByUserEntityService } from '@domain/services/entities/user/findby.service';
import { Inject } from '@nestjs/common';

import {
  AuthLoginParams,
  IAuthLoginUseCase,
} from '@domain/usecases/auth/login.usecase';
import { AuthenticationErrors } from '@domain/errors/auth/authError';

export class AuthLoginUseCase implements IAuthLoginUseCase {
  constructor(
    @Inject(INJECTION_SERVICE_FINDBY_USER)
    private readonly findUserService: IFindByUserEntityService,
    @Inject(INJECTION_SERVICE_AUTH)
    private readonly authService: IAuthService,
  ) {}

  async execute({
    params,
  }: AuthLoginParams): Promise<IAuthLoginResponse | void> {
    const user = await this.findUserService.execute({
      filters: {
        where: {
          AND: [{ column: 'email', value: params.email }],
        },
      },
    });
    if (user.isLeft()) {
      throw UsersErrors.userNotFound();
    }

    const passwordMatch = await this.authService.compare(
      params.password,
      user.value.password,
    );

    if (!passwordMatch) {
      throw AuthenticationErrors.invalidCredentials();
    }

    return this.generateToken(user.value);
  }

  private async generateToken(user: UserEntity): Promise<IAuthLoginResponse> {
    const token = this.authService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      refreshCount: 0,
    });

    return { token, user };
  }
}
