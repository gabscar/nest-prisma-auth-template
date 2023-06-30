import { ApiException } from '@app/exceptions/api.exception';
import { ApiExceptionBody } from '@domain/interfaces/common/error.interface';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../../infra/services/logger/logger.service';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: ApiExceptionBody = {
      code: 'ISE-000',
      message: 'An internal server error has occurred',
      shortMessage: 'internalServerError',
    };

    if (
      exception instanceof ApiException ||
      exception instanceof HttpException
    ) {
      status = exception.getStatus();
      body = exception.getResponse() as any;
    }

    this.logMessage(request, status, body, exception);

    response.status(status).json({
      status,
      body,
    });
  }

  private logMessage(
    request: any,
    status: number,
    _body: string | object,
    exception: any,
  ) {
    const context = 'End Request';
    const body = `${request.method} ${
      request.path
    } STATUS=${status} MESSAGE=${JSON.stringify(_body)}`;

    if (status >= 500) {
      this.logger.error(context, body, exception.stack);
    } else {
      this.logger.warn(context, body);
    }
  }
}
