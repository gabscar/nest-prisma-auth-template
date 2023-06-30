import { ApiException } from '@app/exceptions/api.exception';
import { HttpStatus } from '@nestjs/common';

export class ForgotError extends ApiException {
  static notMatch(): ApiException {
    return new ForgotError(
      {
        code: 'FE-001',
        message: 'Password not match',
        shortMessage: 'notMatch',
      },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }

  static tokenCreationError(): ApiException {
    return new ForgotError(
      {
        code: 'FE-002',
        message: 'Token creation error',
        shortMessage: 'tokenCreationError',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static hashError(): ApiException {
    return new ForgotError(
      {
        code: 'FE-006',
        message: 'Hash passowrd error',
        shortMessage: 'hashError',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
