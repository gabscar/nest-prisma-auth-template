import { UserRoles } from '@domain/constants/enum/userRoles.enum';
import { SetMetadata } from '@nestjs/common';
import { USER_ROLES_KEY_DECORATOR } from '@src/domain/constants/decorators.constant';

export const Roles = (...roles: UserRoles[]) =>
  SetMetadata(USER_ROLES_KEY_DECORATOR, roles);
