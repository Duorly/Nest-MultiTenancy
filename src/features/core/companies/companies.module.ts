import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { DatabaseService } from '../../../common/database/database.service';
import { DatabasesModule } from '../../../common/database/database.module';
import { User } from '../../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, User]), DatabasesModule],
  controllers: [CompaniesController],
  providers: [CompaniesService, DatabaseService],
})
export class CompaniesModule {}
