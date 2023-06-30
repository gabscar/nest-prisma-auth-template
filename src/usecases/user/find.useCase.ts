import { INJECTION_SERVICE_FINDBY_USER } from '@domain/constants/injections/user.constant';
import { UsersErrors } from '@domain/errors/user/userError';

import { Inject } from '@nestjs/common';
import { UserEntity } from '@domain/entities/user.entity';
import { IFindByUserEntityService } from '@domain/services/entities/user/findby.service';
import { IFindByUserUseCase } from '@domain/usecases/user/findBy.usecase';

export class FindUserUseCase implements IFindByUserUseCase {
  constructor(
    @Inject(INJECTION_SERVICE_FINDBY_USER)
    private readonly userService: IFindByUserEntityService,
  ) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userService.execute({
      filters: {
        where: {
          AND: [{ column: 'id', value: id }],
        },
      },
      relations: [{ table: 'address', columns: [] }],
    });

    if (user.isLeft()) {
      throw UsersErrors.notFound();
    }

    return user.value;
  }
}
