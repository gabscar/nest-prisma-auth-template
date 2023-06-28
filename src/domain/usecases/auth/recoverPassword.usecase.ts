import { IAuthRecoverPasswordParams } from '@domain/interfaces/auth/recoverPassword.interface';
import { IBaseUseCase } from '@domain/usecases/base.usecase';

export type IAuthRecoverPasswordUseCase = IBaseUseCase<
  [IAuthRecoverPasswordParams],
  void
>;
