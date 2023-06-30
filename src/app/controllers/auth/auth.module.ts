import {
  INJECTION_SERVICE_FINDBY_USER,
  INJECTION_REPOSITORY_USER,
  INJECTION_SERVICE_UPDATE_USER,
} from '@domain/constants/injections/user.constant';
import { Module } from '@nestjs/common';
import { UserRepositoryDatabase } from '@infra/repositories/user.repository';
import { DatabaseModule } from '@infra/database/database.module';

import { FindUserService } from '@infra/services/entities/user/findBy.service';
import { AuthLoginUseCase } from '@usecases/auth/login.usecase';
import { AuthService } from '@infra/services/auth/auth.service';
import { AuthLoginController } from './login.controller';
import { PassportModule } from '@nestjs/passport';
import { BullConfigModule } from '@app/services/queue/bullConfig.module';
import { JwtStrategy } from '@infra/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthForgotPasswordController } from './forgotPassword.controller';
import { AuthRecoverPasswordController } from './recoverPassword.controller';
import { ValidationCodeRepositoryDatabase } from '@infra/repositories/validationCode.repository';
import {
  INJECTION_REPOSITORY_VALIDATION_CODE,
  INJECTION_SERVICE_CREATE_VALIDATION_CODE,
  INJECTION_SERVICE_DELETE_VALIDATION_CODE,
  INJECTION_SERVICE_FINDBY_VALIDATION_CODE,
} from '@domain/constants/injections/validationCode.constant';
import { AuthForgotPasswordUseCase } from '@usecases/auth/forgotPassword.usecase';
import {
  INJECTION_SERVICE_AUTH,
  INJECTION_USECASE_AUTH,
  INJECTION_USECASE_FORGOT,
  INJECTION_USECASE_RESET,
} from '@domain/constants/injections/auth.constant';
import { AuthRecoverPasswordUseCase } from '@usecases/auth/recoverPassword.usecase';
import { CreateValidationCodeService } from '@infra/services/entities/validationCode/create.service';
import { FindValidationCodeService } from '@infra/services/entities/validationCode/find.service';
import { DeleteValidationCodeService } from '@infra/services/entities/validationCode/delete.service';
import { UpdateUserService } from '@infra/services/entities/user/update.service';

const servicesArr = [
  { useClass: FindUserService, provide: INJECTION_SERVICE_FINDBY_USER },
  { useClass: AuthService, provide: INJECTION_SERVICE_AUTH },
  {
    useClass: CreateValidationCodeService,
    provide: INJECTION_SERVICE_CREATE_VALIDATION_CODE,
  },
  {
    useClass: FindValidationCodeService,
    provide: INJECTION_SERVICE_FINDBY_VALIDATION_CODE,
  },
  {
    useClass: DeleteValidationCodeService,
    provide: INJECTION_SERVICE_DELETE_VALIDATION_CODE,
  },
  {
    useClass: UpdateUserService,
    provide: INJECTION_SERVICE_UPDATE_USER,
  },
];

const useCasesArr = [
  { useClass: AuthLoginUseCase, provide: INJECTION_USECASE_AUTH },
  { useClass: AuthForgotPasswordUseCase, provide: INJECTION_USECASE_FORGOT },
  { useClass: AuthRecoverPasswordUseCase, provide: INJECTION_USECASE_RESET },
];

@Module({
  exports: [{ useClass: AuthService, provide: INJECTION_SERVICE_AUTH }],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRATION_TIME_HOURS}h` },
    }),
    DatabaseModule,
    PassportModule,
    BullConfigModule,
  ],
  controllers: [
    AuthLoginController,
    AuthForgotPasswordController,
    AuthRecoverPasswordController,
  ],
  providers: [
    ...useCasesArr,
    ...servicesArr,
    JwtStrategy,
    { useClass: UserRepositoryDatabase, provide: INJECTION_REPOSITORY_USER },
    {
      useClass: ValidationCodeRepositoryDatabase,
      provide: INJECTION_REPOSITORY_VALIDATION_CODE,
    },
  ],
})
export class AuthModule {}
