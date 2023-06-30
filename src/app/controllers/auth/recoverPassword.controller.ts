import { Body, Controller, HttpCode, Patch, Inject } from '@nestjs/common';
import { IsPublic } from '@infra/decorators/isPublic.decorator';
import { AuthRecoverPasswordDto } from '@app/dtos/auth/recoverPasssword.dto';
import { AuthRecoverPasswordUseCase } from '@usecases/auth/recoverPassword.usecase';
import { INJECTION_USECASE_RESET } from '@domain/constants/injections/auth.constant';

@Controller('auth')
export class AuthRecoverPasswordController {
  constructor(
    @Inject(INJECTION_USECASE_RESET)
    private readonly authRecoverPasswordUseCase: AuthRecoverPasswordUseCase,
  ) {}

  @IsPublic()
  @HttpCode(204)
  @Patch('recoverPassword')
  async recoverPassword(@Body() dto: AuthRecoverPasswordDto): Promise<void> {
    await this.authRecoverPasswordUseCase.execute(dto);
  }
}
