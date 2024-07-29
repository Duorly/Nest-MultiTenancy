import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabasesModule } from './common/database/database.module';
import { AuthenticationModule } from './features/core/authentication/authentication.module';
import { UsersModule } from './features/users/users.module';
import { CompaniesModule } from './features/core/companies/companies.module';

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
  providers: [],
})
export class AppModule {}
