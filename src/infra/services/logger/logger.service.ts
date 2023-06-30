import { ILogger } from '@domain/interfaces/common/logger.interface';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger implements ILogger {
  debug(context: string, message: string) {
    if (process.env.NODE_ENV !== 'production') {
      super.debug(message, context);
    }
  }

  log(context: string, message: string) {
    super.log(message, context);
  }

  error(context: string, message: string, trace?: string) {
    super.error(message, trace, context);
  }

  warn(context: string, message: string) {
    super.warn(message, context);
  }

  verbose(context: string, message: string) {
    if (process.env.NODE_ENV !== 'production') {
      super.verbose(message, context);
    }
  }
}
