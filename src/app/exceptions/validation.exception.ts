import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ApiException } from './api.exception';

export class ValidationException extends ApiException {
  constructor(validationErrors: ValidationError[]) {
    const formattedErrors = validationErrors.map((error) => error.constraints);
    super(
      {
        code: 'VE-000',
        message: 'The DTO validation has failed',
        shortMessage: 'Validation error',
        validationErrors: formattedErrors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
