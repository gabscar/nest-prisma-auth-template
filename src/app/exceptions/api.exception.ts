import { ApiExceptionBody } from '@domain/interfaces/common/error.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(body: ApiExceptionBody, statusCode: HttpStatus) {
    super(body, statusCode);
  }
}
