import { IPaginationOutput } from '@domain/interfaces/common/pagination.interface';
import { IUpdateUserInput } from '@domain/interfaces/user/update.interface';
import { UserEntity } from '../entities/user.entity';
import { ICreateUserInput } from '../interfaces/user/create.interface';
import { IWhere } from '@domain/interfaces/common/where.interface';
import { IFindAllServiceUserInput } from '@domain/services/entities/user/findAll.service';
import { IInputFindByUserService } from '@domain/services/entities/user/findby.service';

export type updateWhereUser = IWhere<keyof UserEntity, string | number>;

export interface IUserRepositoryDatabase {
  create(params: ICreateUserInput): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  findAll(
    params: IFindAllServiceUserInput,
  ): Promise<IPaginationOutput<UserEntity>>;
  findBy(params: IInputFindByUserService): Promise<UserEntity>;
  update(where: updateWhereUser, params: IUpdateUserInput): Promise<UserEntity>;
}
