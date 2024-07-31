import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler, UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../features/users/users.service';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(
    private readonly userService: UsersService,
    private readonly databaseService: DatabaseService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    if (userId) {
      const user = await this.userService.findOne(userId);
      if (!user || !user.connectedCompany) {
        throw new UnauthorizedException('User not associated with any company');
      }

      const companyDbName = user.connectedCompany.dbName;

      request['dataSource'] =
        await this.databaseService.getDataSource(companyDbName);
    }

    return next.handle();
  }
}
