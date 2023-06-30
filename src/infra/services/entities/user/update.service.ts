import { UsersErrors } from '@domain/errors/user/userError';
import { IUserRepositoryDatabase } from '@domain/repositories/user.repository';
import { IOutputCreateUserDto } from '@domain/usecases/user/create.usecase';
import { Inject } from '@nestjs/common';
import { right, left } from '@src/shared/either';
import { INJECTION_REPOSITORY_USER } from '@domain/constants/injections/user.constant';
import {
  IInputUpdateUserService,
  IUpdateUserEntityService,
} from '@domain/services/entities/user/update.service';

export class UpdateUserService implements IUpdateUserEntityService {
  constructor(
    @Inject(INJECTION_REPOSITORY_USER)
    private readonly userRepository: IUserRepositoryDatabase,
  ) {}

  async execute(
    params: IInputUpdateUserService,
  ): Promise<IOutputCreateUserDto> {
    try {
      const user = await this.userRepository.update(params.where, params.data);

      return right(user);
    } catch (err) {
      console.log(err);
      return left(UsersErrors.updateEntity());
    }
  }
}
