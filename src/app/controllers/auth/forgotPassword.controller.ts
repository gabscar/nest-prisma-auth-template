import { INJECTION_USECASE_FORGOT } from '@domain/constants/injections/auth.constant';
import { Body, Controller, HttpCode, Post, Inject } from '@nestjs/common';

import { AuthForgotPasswordUseCase } from '@usecases/auth/forgotPassword.usecase';

@Controller('auth')
export class AuthForgotPasswordController {
  constructor(
    @Inject(INJECTION_USECASE_FORGOT)
    private readonly authForgotPasswordUseCase: AuthForgotPasswordUseCase,
  ) {}

  @HttpCode(204)
  @Post('forgotPassword')
  async forgotPassowrd(@Body('email') email: string): Promise<void> {
    await this.authForgotPasswordUseCase.execute(email);
  }
}
