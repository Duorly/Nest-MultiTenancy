import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../features/users/users.service';

@Injectable()
export class ConnectedCompanyInterceptor implements NestInterceptor {
  constructor(private readonly userService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    if (userId) {
      const user = await this.userService.findOne(userId);
      if (user && user.connectedCompany) {
        request.company = user.connectedCompany;
      }
    }
    return next.handle();
  }
}
