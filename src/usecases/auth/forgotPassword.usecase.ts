import { Inject } from '@nestjs/common';

import { IMailSendForgotPasswordEmail } from '@domain/interfaces/mail.interface';
import { IQueueProducer } from '@domain/interfaces/queue.interface';
import { IAuthForgotPasswordUseCase } from '@domain/usecases/auth/forgotPassword.usecase';
import { SendEmailProducerBull } from '@infra/queues/producers/sendEmail.producer';
import {
  INJECTION_SERVICE_CREATE_VALIDATION_CODE,
  INJECTION_SERVICE_FINDBY_USER,
} from '@domain/constants/injections/user.constant';
import { IFindByUserEntityService } from '@domain/services/entities/user/findby.service';
import { ICreateValidationCodeEntityService } from '@domain/services/validationCode/create.service';
import { IAuthService } from '@domain/services/auth/auth.service';
import { AuthService } from '@infra/services/auth/auth.service';
import { ForgotError } from '@domain/errors/auth/forgotError';

export class AuthForgotPasswordUseCase implements IAuthForgotPasswordUseCase {
  constructor(
    @Inject(INJECTION_SERVICE_FINDBY_USER)
    private readonly findUserService: IFindByUserEntityService,
    @Inject(INJECTION_SERVICE_CREATE_VALIDATION_CODE)
    private readonly createValidationCodeService: ICreateValidationCodeEntityService,

    @Inject(AuthService)
    private readonly authService: IAuthService,
    @Inject(SendEmailProducerBull)
    private readonly sendEmailQueue: IQueueProducer,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.findUserService.execute({
      filters: {
        where: {
          AND: [{ column: 'email', value: email }],
        },
      },
    });
    if (user.isLeft()) {
      throw user.value;
    }

    const validationCode = await this.createValidationCodeService.execute({
      type: 'PASSWORD',
      userId: user.value.id,
    });
    if (validationCode.isLeft()) {
      throw validationCode.value;
    }

    const validationCodeIdHashed = await this.authService.hash(
      validationCode.value.code.toString(),
    );
    if (!validationCodeIdHashed) {
      throw ForgotError.hashError();
    }

    const data = {
      userName: user.value.name,
      link: 'link',
    };

    await this.sendEmailQueue.publish<IMailSendForgotPasswordEmail>({
      to: user.value.email,
      subject: 'Recuperação de senha',
      templateName: 'recoverPassword',
      data,
    });
  }
}
