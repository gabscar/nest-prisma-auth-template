import {
  INJECTION_SERVICE_CREATE_USER,
  INJECTION_REPOSITORY_USER,
  INJECTION_USECASE_CREATE_USER,
} from '@domain/constants/injections/user.constant';
import { Module } from '@nestjs/common';
import { CreateUserController } from './create.controller';
import { UserRepositoryDatabase } from '@infra/repositories/user.repository';
import { DatabaseModule } from '@infra/database/database.module';
import { CreateUserUseCase } from '@usecases/user/create.usecase';
import { CreateUserService } from '@infra/services/entities/user/create.service';
import { AuthModule } from '../auth/auth.module';

const servicesArr = [
  { useClass: CreateUserService, provide: INJECTION_SERVICE_CREATE_USER },
];

const useCasesArr = [
  { useClass: CreateUserUseCase, provide: INJECTION_USECASE_CREATE_USER },
];

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CreateUserController],
  providers: [
    ...useCasesArr,
    ...servicesArr,
    { useClass: UserRepositoryDatabase, provide: INJECTION_REPOSITORY_USER },
  ],
})
export class UserModule {}
