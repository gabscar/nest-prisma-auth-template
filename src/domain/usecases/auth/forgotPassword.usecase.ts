import { IBaseUseCase } from '@domain/usecases/base.usecase';

export type IAuthForgotPasswordUseCase = IBaseUseCase<[string], void>;
