import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { DatabaseService } from '../../../common/database/database.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private databaseService: DatabaseService,
  ) {}

  async create(dto: CreateCompanyDto, user: User) {
    const authUser = await this.usersRepository.findOne({
      where: { id: user.id },
    });
    const company = this.companiesRepository.create({
      ...dto,
      dbName: dto.name.toLowerCase().replace(/\s/g, '_').trim(),
      owner: authUser,
    });
    this.databaseService.checkIfDBExists(company.dbName).then(async (res) => {
      if (res) {
        throw new HttpException('Company already exists', 400);
      }
    });
    await this.databaseService.createDB(company.dbName);
    return this.companiesRepository.save(company);
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  async remove(id: string, user: User) {
    const authUser = await this.usersRepository.findOne({
      where: { id: user.id },
    });

    const company = await this.companiesRepository.findOne({
      where: {
        id: id,
        owner: {
          id: authUser.id,
        },
      },
    });

    if (company) {
      this.databaseService.checkIfDBExists(company.dbName).then(async (res) => {
        if (res) {
          await this.databaseService.dropDB(company.dbName);
        }
      });

      await this.companiesRepository.delete({ id: company.id });
    } else {
      throw new NotFoundException('Company not found');
    }
  }
}
