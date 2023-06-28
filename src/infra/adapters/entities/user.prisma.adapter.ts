import { UserEntity, IUserRelations } from '@domain/entities/user.entity';
import { IPaginationOutput } from '@domain/interfaces/common/pagination.interface';
import { User } from '@prisma/client';

export class UserPrismaAdapter {
  static get(user: User & Partial<IUserRelations>): UserEntity {
    return this.adapt(user);
  }

  static list(
    users: (User & Partial<IUserRelations>)[],
    page: number,
    max: number,
  ): IPaginationOutput<UserEntity> {
    return {
      data: users.map((user) => this.adapt(user)),
      meta: {
        taken: users.length,
        page,
        max,
      },
    };
  }

  private static adapt(user: User & Partial<IUserRelations>): UserEntity {
    if (!user) return null;

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      address: user.address,
    });
  }
}
