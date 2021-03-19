import { join } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export default {
  // 这里使用的是QQ邮箱格式如下，邮箱:后面接的是QQ邮箱的授权码，具体授权码需要自己去QQ邮箱找
  transport: 'smtps://ezoking@foxmail.com:leobjnmxrcmrbefd@smtp.qq.com',
  defaults: {
    from: '"nest-modules" <modules@nestjs.com>',
  },
  template: {
    dir: join(__dirname, '../templates/email'), // 模板地址
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
};
