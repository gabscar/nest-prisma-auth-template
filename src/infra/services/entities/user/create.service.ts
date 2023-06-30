import { UsersErrors } from '@domain/errors/user/userError';
import { ICreateUserInput } from '@domain/interfaces/user/create.interface';
import { IUserRepositoryDatabase } from '@domain/repositories/user.repository';
import { IOutputCreateUserDto } from '@domain/usecases/user/create.usecase';
import { Inject } from '@nestjs/common';
import { right, left } from '@src/shared/either';
import { INJECTION_REPOSITORY_USER } from '@domain/constants/injections/user.constant';
import { ICreateUserEntityService } from '@domain/services/entities/user/create.service';

export class CreateUserService implements ICreateUserEntityService {
  constructor(
    @Inject(INJECTION_REPOSITORY_USER)
    private readonly userRepository: IUserRepositoryDatabase,
  ) {}

  async execute(params: ICreateUserInput): Promise<IOutputCreateUserDto> {
    try {
      const user = await this.userRepository.create(params);

      return right(user);
    } catch (err) {
      console.log(err);
      return left(UsersErrors.createEntity());
    }
  }
}
