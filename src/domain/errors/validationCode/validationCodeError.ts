import { ApiException } from '@app/exceptions/api.exception';
import { HttpStatus } from '@nestjs/common';

export class ValidationCodeError extends ApiException {
  static tokenCreationError(): ApiException {
    return new ValidationCodeError(
      {
        code: 'VC-002',
        message: 'Token creation error',
        shortMessage: 'tokenCreationError',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static invalidTokenError(): ApiException {
    return new ValidationCodeError(
      {
        code: 'VC-003',
        message: 'Invalid token',
        shortMessage: 'invalidTokenError',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  static tokenExpiredError(): ApiException {
    return new ValidationCodeError(
      {
        code: 'VC-004',
        message: 'Token expired',
        shortMessage: 'tokenExpiredError',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  static notFoundToken(): ApiException {
    return new ValidationCodeError(
      {
        code: 'VC-005',
        message: 'Not found token',
        shortMessage: 'notFoundToken',
      },
      HttpStatus.NOT_FOUND,
    );
  }
  static deleteToken(): ApiException {
    return new ValidationCodeError(
      {
        code: 'VC-006',
        message: 'Error in delete validation code',
        shortMessage: 'deleteToken',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
