import { IError } from '@src/shared/IError';

export class AuthenticationErrors extends IError {
  static invalidCredentials(): IError {
    return new AuthenticationErrors({
      statusCode: 401,
      body: {
        code: 'AE-001',
        message: 'Password wrong',
        shortMessage: 'wrongCredentials',
      },
    });
  }

  static tokenCreationError(): IError {
    return new AuthenticationErrors({
      statusCode: 500,
      body: {
        code: 'AE-002',
        message: 'Token creation error',
        shortMessage: 'tokenCreationError',
      },
    });
  }

  static invalidTokenError(): IError {
    return new AuthenticationErrors({
      statusCode: 401,
      body: {
        code: 'AE-003',
        message: 'Invalid token',
        shortMessage: 'invalidTokenError',
      },
    });
  }

  static tokenExpiredError(): IError {
    return new AuthenticationErrors({
      statusCode: 401,
      body: {
        code: 'AE-004',
        message: 'Token expired',
        shortMessage: 'tokenExpiredError',
      },
    });
  }

  static tokenRenewalTimeExceeded(): IError {
    return new AuthenticationErrors({
      statusCode: 401,
      body: {
        code: 'AE-006',
        message: 'Time to renewal token exceeded',
        shortMessage: 'tokenRenewalTimeExceeded',
      },
    });
  }
  static notAllowed(): IError {
    return new AuthenticationErrors({
      statusCode: 405,
      body: {
        code: 'AU-007',
        message: 'You not have permission to acess this resource',
        shortMessage: 'notAllowedErr',
      },
    });
  }
}
