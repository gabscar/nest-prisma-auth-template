import { IAuthLoginParams } from 'src/domain/interfaces/auth/login.interface';
import { IBaseUseCase } from '../base.usecase';
import { IAuthLoginResponse } from '@domain/interfaces/auth/auth.interface';

export type AuthLoginParams = {
  params: IAuthLoginParams;
};

export type IAuthLoginUseCase = IBaseUseCase<
  [AuthLoginParams],
  IAuthLoginResponse
>;
