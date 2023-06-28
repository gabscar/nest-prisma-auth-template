import { IError } from '@src/shared/IError';

export class ValidationCodeError extends IError {
  static tokenCreationError(): IError {
    return new ValidationCodeError({
      statusCode: 500,
      body: {
        code: 'VC-002',
        message: 'Token creation error',
        shortMessage: 'tokenCreationError',
      },
    });
  }

  static invalidTokenError(): IError {
    return new ValidationCodeError({
      statusCode: 401,
      body: {
        code: 'VC-003',
        message: 'Invalid token',
        shortMessage: 'invalidTokenError',
      },
    });
  }

  static tokenExpiredError(): IError {
    return new ValidationCodeError({
      statusCode: 401,
      body: {
        code: 'VC-004',
        message: 'Token expired',
        shortMessage: 'tokenExpiredError',
      },
    });
  }

  static notFoundToken(): IError {
    return new ValidationCodeError({
      statusCode: 401,
      body: {
        code: 'VC-005',
        message: 'Not found token',
        shortMessage: 'notFoundToken',
      },
    });
  }
  static deleteToken(): IError {
    return new ValidationCodeError({
      statusCode: 401,
      body: {
        code: 'VC-006',
        message: 'Error in delete validation code',
        shortMessage: 'deleteToken',
      },
    });
  }
}
