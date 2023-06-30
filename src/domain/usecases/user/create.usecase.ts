import { ApiException } from '@app/exceptions/api.exception';
import { UserEntity } from '@domain/entities/user.entity';
import { ICreateUserInput } from '@domain/interfaces/user/create.interface';
import { IBaseUseCase } from '../base.usecase';
import { Either } from '@src/shared/either';

export type IOutputCreateUserDto = Either<ApiException, UserEntity>;

export type ICreateUserUseCase = IBaseUseCase<[ICreateUserInput], UserEntity>;
