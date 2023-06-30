import { INJECTION_SERVICE_CREATE_USER } from '@domain/constants/injections/user.constant';
import { UsersErrors } from '@domain/errors/user/userError';
import { ICreateUserInput } from '@domain/interfaces/user/create.interface';
import { IOutputCreateUserDto } from '@domain/usecases/user/create.usecase';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@domain/entities/user.entity';
import { IAbstractService } from '@domain/services/baseAbstract.service';
import { IAuthService } from '@domain/services/auth/auth.service';
import { AuthenticationErrors } from '@domain/errors/auth/authError';
import { INJECTION_SERVICE_AUTH } from '@domain/constants/injections/auth.constant';

export class CreateUserUseCase {
  constructor(
    @Inject(INJECTION_SERVICE_CREATE_USER)
    private readonly userService: IAbstractService<
      ICreateUserInput,
      IOutputCreateUserDto
    >,
    @Inject(INJECTION_SERVICE_AUTH)
    private readonly authService: IAuthService,
  ) {}

  async execute(params: ICreateUserInput): Promise<UserEntity> {
    const hashedPassword = await this.hashPassword(params.password);
    const user = await this.userService.execute({
      ...params,
      password: hashedPassword,
    });

    if (user.isLeft()) {
      throw UsersErrors.createEntity();
    }

    return user.value;
  }

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await this.authService.hash(password);
    if (!hashedPassword) {
      throw AuthenticationErrors.tokenCreationError();
    }
    return hashedPassword;
  }
}
