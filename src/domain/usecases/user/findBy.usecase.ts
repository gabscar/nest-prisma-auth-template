import { UserEntity } from '@domain/entities/user.entity';
import { IBaseUseCase } from '../base.usecase';

export type IFindByUserUseCase = IBaseUseCase<[string], UserEntity>;
