import { SetMetadata } from '@nestjs/common';

export const Roles = (roles: Array<string>) => SetMetadata('roles', roles);
