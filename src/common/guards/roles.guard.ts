import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 与自定义装饰器桥接
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    // 传入的参数
    const { role } = request.query;

    // 在角色列表中对比有无对应角色
    return !!roles.find(r => r === role);
  }
}
