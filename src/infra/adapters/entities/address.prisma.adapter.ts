import {
  AddressEntity,
  AddressRelations,
} from '@domain/entities/address.entity';
import { IPaginationOutput } from '@domain/interfaces/common/pagination.interface';
import { Address } from '@prisma/client';

export class AddressPrismaAdapter {
  static get(address: Address & Partial<AddressRelations>): AddressEntity {
    return this.adapt(address);
  }

  static list(
    addresses: (Address & Partial<AddressRelations>)[],
    page: number,
    max: number,
  ): IPaginationOutput<AddressEntity> {
    return {
      data: addresses.map((address) => this.adapt(address)),
      meta: {
        taken: addresses.length,
        page,
        max,
      },
    };
  }

  private static adapt(
    address: Address & Partial<AddressRelations>,
  ): AddressEntity {
    if (!address) return null;

    return new AddressEntity({
      id: address.id,
      zipCode: address.zipCode,
      street: address.street,
      city: address.city,
      state: address.state,
      number: address.number,
      complement: address.complement,
      neighborhood: address.neighborhood,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
      deletedAt: address.deletedAt,
      userId: address.userId,
      user: address.user,
    });
  }
}
