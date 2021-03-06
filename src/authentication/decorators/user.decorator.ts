import { createParamDecorator, ExecutionContext, Logger, Type, UnauthorizedException } from '@nestjs/common';
import { UserBaseEntity } from '../models';

const logger = new Logger('UserParamDecorator');

export function createCurrentUserDecorator<T extends UserBaseEntity>(userType: Type<T>) {
  return createParamDecorator<never, ExecutionContext, T>((data, context) => {
    const req = context.switchToHttp().getRequest();

    if (!req.currentUser) {
      throw new UnauthorizedException();
    }

    if (req.currentUser instanceof userType) {
      const user = req.currentUser as T;
      logger.debug(`Current User: Type=${userType.name} Id=${user.id}, Email=${user.email}`);
      return user;
    }

    throw new UnauthorizedException();
  });
}

export const CurrentUserBase = createCurrentUserDecorator(UserBaseEntity);
