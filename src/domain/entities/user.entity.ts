import { AddressEntity } from './address.entity';
export abstract class IUserRelations {
  address: AddressEntity;
}

export class UserEntity extends IUserRelations {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(userProps: Partial<UserEntity>) {
    super();
    Object.assign(this, userProps);
  }
}
