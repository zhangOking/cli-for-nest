import * as path from 'path';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { resolve } from 'path';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { MailerModule } from '@nest-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusMonitorModule } from 'nest-status-monitor';
import { ScheduleModule } from '@nestjs/schedule';

import statusMonitorConfig from './config/statusMonitor';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { HelloModule } from './modules/hello/hello.module';
import { EmailModule } from './modules/email/email.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AudioModule } from './jobs/audio/audio.module';


@Module({
  imports: [
    // 引入config
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),

    // 配置状态监测
    StatusMonitorModule.setUp(statusMonitorConfig),

    // 配置邮箱
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('email'),
      inject: [ConfigService],
    }),

    // mysql配置
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),

    // 定时任务
    // ScheduleModule.forRoot(),
    // TasksModule,

    // 其他模块
    HelloModule,
    EmailModule,
    AuthModule,
    UsersModule,
    AudioModule
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // 为 hello 路由添加中间件
    consumer
      .apply(LoggerMiddleware)
      // 排除hell的post请求
      .exclude({ path: 'hello', method: RequestMethod.POST })
      .forRoutes('hello');
  }
}
