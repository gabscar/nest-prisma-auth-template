import { INJECTION_USECASE_AUTH } from '@domain/constants/injections/auth.constant';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from 'src/app/dtos/auth/login.dto';
import { AuthLoginPresenter } from 'src/app/presenters/auth/login.presenter';
import { IAuthLoginUseCase } from 'src/domain/usecases/auth/login.usecase';
import { IsPublic } from 'src/infra/decorators/isPublic.decorator';

@Controller('auth')
export class AuthLoginController {
  constructor(
    @Inject(INJECTION_USECASE_AUTH)
    private readonly authLoginUseCase: IAuthLoginUseCase,
  ) {}

  @IsPublic()
  @Post('login')
  async login(
    @Res() res: Response,
    @Body() params: AuthLoginDto,
  ): Promise<AuthLoginPresenter | void> {
    const result = await this.authLoginUseCase.execute({
      params,
    });

    if (!result) {
      res.status(HttpStatus.NO_CONTENT).send();
      return;
    }

    res.status(HttpStatus.CREATED).send(new AuthLoginPresenter(result));
  }
}
