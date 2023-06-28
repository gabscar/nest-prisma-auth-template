import { UserEntity } from '@domain/entities/user.entity';
import { IPaginationOutput } from '@domain/interfaces/common/pagination.interface';
import { ICreateUserInput } from '@domain/interfaces/user/create.interface';
import {
  IUserRepositoryDatabase,
  updateWhereUser,
} from '@domain/repositories/user.repository';
import { PrismaService } from '@infra/database/prisma.service';

import { Injectable } from '@nestjs/common';
import { IFindAllServiceUserInput } from '@domain/services/entities/user/findAll.service';
import { PrismaAdapter } from '@infra/adapters/orm/prisma.adapter';
import { UserPrismaAdapter } from '@infra/adapters/entities/user.prisma.adapter';
import { IInputFindByUserService } from '@domain/services/entities/user/findby.service';

@Injectable()
export class UserRepositoryDatabase implements IUserRepositoryDatabase {
  constructor(private readonly databaseService: PrismaService) {}

  async create(params: ICreateUserInput): Promise<UserEntity> {
    const user = await this.databaseService.user.create({ data: params });

    return new UserEntity(user);
  }
  async delete(id: string): Promise<void> {
    await this.databaseService.user.delete({
      where: { id },
    });
  }

  async findAll(
    params: IFindAllServiceUserInput,
  ): Promise<IPaginationOutput<UserEntity>> {
    const { queryParams, paginationCountParams } = new PrismaAdapter(params);
    const [users, max] = await this.databaseService.$transaction([
      this.databaseService.user.findMany(queryParams),
      this.databaseService.user.count(paginationCountParams),
    ]);

    return UserPrismaAdapter.list(users, params.pagination.page, max);
  }

  async findBy(params: IInputFindByUserService): Promise<UserEntity> {
    const { queryParams } = new PrismaAdapter(params);
    const user = await this.databaseService.user.findFirst(queryParams);
    return new UserEntity(user);
  }

  async update(
    updateWhere: updateWhereUser,
    params: Partial<ICreateUserInput>,
  ): Promise<UserEntity> {
    const user = await this.databaseService.user.update({
      where: {
        [updateWhere.column]: updateWhere.value,
      },
      data: params,
    });
    return new UserEntity(user);
  }
}
