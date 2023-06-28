import { IError } from '@src/shared/IError';

export class ForgotError extends IError {
  static notMatch(): IError {
    return new ForgotError({
      statusCode: 401,
      body: {
        code: 'FE-001',
        message: 'Password not match',
        shortMessage: 'notMatch',
      },
    });
  }

  static tokenCreationError(): IError {
    return new ForgotError({
      statusCode: 500,
      body: {
        code: 'FE-002',
        message: 'Token creation error',
        shortMessage: 'tokenCreationError',
      },
    });
  }

  static invalidTokenError(): IError {
    return new ForgotError({
      statusCode: 401,
      body: {
        code: 'FE-003',
        message: 'Invalid token',
        shortMessage: 'invalidTokenError',
      },
    });
  }

  static tokenExpiredError(): IError {
    return new ForgotError({
      statusCode: 401,
      body: {
        code: 'FE-004',
        message: 'Token expired',
        shortMessage: 'tokenExpiredError',
      },
    });
  }

  static notFoundToken(): IError {
    return new ForgotError({
      statusCode: 401,
      body: {
        code: 'FE-005',
        message: 'Not found token',
        shortMessage: 'notFoundToken',
      },
    });
  }

  static hashError(): IError {
    return new ForgotError({
      statusCode: 500,
      body: {
        code: 'FE-006',
        message: 'Hash passowrd error',
        shortMessage: 'hashError',
      },
    });
  }
}
