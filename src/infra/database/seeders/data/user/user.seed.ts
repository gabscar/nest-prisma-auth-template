import { hashSync } from 'bcrypt';
import { UserEntity } from '@domain/entities/user.entity';
import { generateUUID } from '../../utils/seedUtils';

export const userSeedNames = {
  admin: '',
  commonUser: '',
  commonUserTwo: '',
  linkerOperator: '',
  supportOperator: '',
};

export const userSeedUUIDS = generateUUID(userSeedNames);

export type UserEntitySeedData = Omit<UserEntity, 'createdAt' | 'updatedAt'>;

export const userSeedData: UserEntitySeedData[] = [
  {
    id: userSeedUUIDS.admin,
    name: 'Admilson Luby',
    email: 'admin@email.com',
    password: hashSync('Lace-4242', 10),
    address: null,
  },
  {
    id: userSeedUUIDS.commonUser,
    name: 'Bruno Dias',
    email: 'common@email.com',
    password: hashSync('Lace-4242', 10),
    address: null,
  },
  {
    id: userSeedUUIDS.commonUserTwo,
    name: 'Laila Ferreira',
    email: 'common2@email.com',
    password: hashSync('Lace-4242', 10),
    address: null,
  },
];
