import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabasesModule } from './common/database/database.module';
import { AuthenticationModule } from './features/core/authentication/authentication.module';
import { UsersModule } from './features/users/users.module';
import { CompaniesModule } from './features/core/companies/companies.module';
import { TenantMiddleware } from './common/middlewares/tenant.middleware';
import { TenantInterceptor } from './common/interceptors/company.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabasesModule,
    AuthenticationModule,
    UsersModule,
    CompaniesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
