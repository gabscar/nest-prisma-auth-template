import { ApiException } from '@app/exceptions/api.exception';
import { HttpStatus } from '@nestjs/common';

export class UsersErrors extends ApiException {
  static createEntity(): ApiException {
    return new UsersErrors(
      {
        code: 'USE-001',
        message:
          'An error occurred while trying to create user, please try again later',
        shortMessage: 'createEntityFailed',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static readEntity(): ApiException {
    return new UsersErrors(
      {
        code: 'USE-002',
        message:
          'An error occurred while trying to read user, please try again later',
        shortMessage: 'readEntityFailed',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static updateEntity(): ApiException {
    return new UsersErrors(
      {
        code: 'USE-003',
        message:
          'An error occurred while trying to update user, please try again later',
        shortMessage: 'updateEntityFailed',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static deleteEntity(): ApiException {
    return new UsersErrors(
      {
        code: 'USE-004',
        message:
          'An error occurred while trying to delete user, please try again later',
        shortMessage: 'deleteEntityFailed',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static notFound(): ApiException {
    return new UsersErrors(
      {
        code: 'USE-005',
        message: 'The user was not found',
        shortMessage: 'userNotFound',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  static alreadyExists(prop?: string): ApiException {
    let message = 'User already exists';

    if (prop) {
      message = `User with '${prop}' already exists`;
    }

    return new UsersErrors(
      {
        code: 'USE-006',
        message,
        shortMessage: 'userAlreadyExists',
      },
      HttpStatus.CONFLICT,
    );
  }

  static list(): ApiException {
    return new UsersErrors(
      {
        code: 'USE-007',
        message:
          'An error occurred while trying to list user, please try again later',
        shortMessage: 'listEntityFailed',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
