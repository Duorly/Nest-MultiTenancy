import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CompanyDataSource = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request['dataSource'];
  },
);
