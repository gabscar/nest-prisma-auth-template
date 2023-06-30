import { ApiException } from '@app/exceptions/api.exception';
import { HttpStatus } from '@nestjs/common';

export class AuthenticationErrors extends ApiException {
  static invalidCredentials(): ApiException {
    return new AuthenticationErrors(
      {
        code: 'AUT-001',
        message: 'Password wrong',
        shortMessage: 'wrongCredentials',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  static tokenCreationError(): ApiException {
    return new AuthenticationErrors(
      {
        code: 'AUT-002',
        message: 'Token creation error',
        shortMessage: 'tokenCreationError',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static invalidTokenError(): ApiException {
    return new AuthenticationErrors(
      {
        code: 'AUT-003',
        message: 'Invalid token',
        shortMessage: 'invalidTokenError',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  static tokenExpiredError(): ApiException {
    return new AuthenticationErrors(
      {
        code: 'AUT-004',
        message: 'Token expired',
        shortMessage: 'tokenExpiredError',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  static invalidCodeError(): ApiException {
    return new AuthenticationErrors(
      {
        code: 'AUT-005',
        message: 'Invalid Code',
        shortMessage: 'invalidCode',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  static tokenRenewalTimeExceeded(): ApiException {
    return new AuthenticationErrors(
      {
        code: 'AUT-006',
        message: 'Time to renewal token exceeded',
        shortMessage: 'tokenRenewalTimeExceeded',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  static notAllowed(): ApiException {
    return new AuthenticationErrors(
      {
        code: 'AUT-007',
        message: 'You not have permission to access this resource',
        shortMessage: 'notAllowedErr',
      },
      HttpStatus.METHOD_NOT_ALLOWED,
    );
  }
}
