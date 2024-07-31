import { Injectable, Logger } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../../features/users/entities/user.entity';
import { Company } from '../../features/core/companies/entities/company.entity';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger(DatabaseService.name);

  private dataSources: Map<string, DataSource> = new Map();

  private createDataSource(dbName: string, entities: any[] = []): DataSource {
    return new DataSource({
      type: 'mysql',
      host: this.configService.get('MYSQL_HOST'),
      port: +this.configService.get('MYSQL_PORT'),
      username: this.configService.get('MYSQL_USER'),
      password: this.configService.get('MYSQL_PASSWORD'),
      database: dbName,
      entities: entities,
    } as DataSourceOptions);
  }

  async createDB(dbName: string): Promise<boolean> {
    const tempDataSource = this.createDataSource('mysql');

    await tempDataSource.initialize();
    const queryRunner = tempDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.query(`CREATE DATABASE ${dbName}`);
      this.logger.log(`Database ${dbName} created successfully`);
      return true;
    } catch (error) {
      this.logger.log(`Failed to create database ${dbName}`, error);
      throw error;
    } finally {
      await queryRunner.release();
      await tempDataSource.destroy();
    }
  }

  async dropDB(dbName: string): Promise<boolean> {
    const tempDataSource = this.createDataSource('mysql');

    await tempDataSource.initialize();
    const queryRunner = tempDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.query(`DROP DATABASE ${dbName}`);
      this.logger.log(`Database ${dbName} dropped successfully`);
      return true;
    } catch (error) {
      this.logger.log(`Failed to drop database ${dbName}`, error);
      throw error;
    } finally {
      await queryRunner.release();
      await tempDataSource.destroy();
    }
  }

  async checkIfDBExists(dbName: string): Promise<boolean> {
    const tempDataSource = this.createDataSource('mysql');

    await tempDataSource.initialize();
    const queryRunner = tempDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      const result = await queryRunner.query(`SHOW DATABASES LIKE '${dbName}'`);
      return result.length > 0;
    } catch (error) {
      this.logger.log(`Failed to check if database ${dbName} exists`, error);
      throw error;
    } finally {
      await queryRunner.release();
      await tempDataSource.destroy();
    }
  }

  async getDataSource(dbName: string): Promise<DataSource> {
    if (this.dataSources.has(dbName)) {
      return this.dataSources.get(dbName);
    }
    const dataSource = this.createDataSource(dbName, [User, Company]);
    await dataSource.initialize();
    this.dataSources.set(dbName, dataSource);
    return dataSource;
  }
}
