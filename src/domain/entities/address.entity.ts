import { IUseCaseOptions } from '@domain/interfaces/common/useCaseOptions.interface';
import { UserEntity } from './user.entity';
export abstract class AddressRelations {
  user: UserEntity;
}
export class AddressEntity extends AddressRelations {
  id: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  state: string;
  street: string;
  zipCode: string;

  userId: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(addressProps: AddressEntity) {
    super();
    Object.assign(this, addressProps);
  }
}

export type IAddressFiltersOptions = keyof Pick<
  AddressEntity,
  'id' | 'zipCode'
>;

export type IAddressUseCaseOptions = IUseCaseOptions<
  AddressEntity,
  IAddressFiltersOptions,
  AddressRelations
>;
