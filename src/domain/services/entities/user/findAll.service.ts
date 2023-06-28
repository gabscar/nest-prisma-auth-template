import { UserEntity } from '@domain/entities/user.entity';
import { IUseCaseOptions } from '@domain/interfaces/common/useCaseOptions.interface';

export type IFindAllServiceUserInput = IUseCaseOptions<UserEntity, 'name', any>;
