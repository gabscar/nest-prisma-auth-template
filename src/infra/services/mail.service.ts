import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailSendEmail } from 'src/domain/interfaces/mail.interface';
import { IMailService } from 'src/domain/services/mail.service';

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail<T>(params: IMailSendEmail<T>): Promise<void> {
    await this.mailerService.sendMail({
      to: params.to,
      from: process.env.SMPT_FROM,
      subject: `Luby: ${params.subject}`,
      template: params.templateName,
      attachments: params.attachments,
      context: params.data,
    });
  }
}
