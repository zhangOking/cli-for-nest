import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
// 中间件必须实现自NestMiddleware
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { method, path, body, originalUrl } = req;
    console.log(`🚀🚀🚀 originalUrl- ${originalUrl} method-  ${method} path - ${path} body - ${JSON.stringify(body)}`);
    next();
  }
}
