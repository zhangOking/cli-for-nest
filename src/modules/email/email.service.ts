import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer'; // 依赖于nodemailer

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail() {
    this.mailerService.sendMail({
      to: '15701542995@163.com',
      from: 'ezoking@foxmail.com',
      // subject: 'Testing Nest MailerModule ✔',
      subject: 'Enjoy life',
      // html: '<b>Welcome Frost!</b>',
      template: 'welcome',
    });
  }
}
