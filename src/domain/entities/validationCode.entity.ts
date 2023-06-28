import { UserEntity } from '@domain/entities/user.entity';

export class ValidationCodeEntity {
  id: string;
  code: string;
  exp: Date;
  type: string;

  userId: string;
  user?: UserEntity;

  createdAt?: Date;

  constructor(props: ValidationCodeEntity) {
    Object.assign(this, props);
  }

  isExpired(): boolean {
    return this.exp.getTime() < new Date().getTime();
  }
}
