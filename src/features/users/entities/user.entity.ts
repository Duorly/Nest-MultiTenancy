import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from '../../../shared/entities/timestamp.entity';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Company } from '../../core/companies/entities/company.entity';

@Entity('users')
export class User extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  username?: string;

  @Index({ unique: true })
  @Column({ nullable: true })
  phone?: string;

  @Index({ unique: true })
  @Column({ nullable: true })
  @IsEmail()
  email?: string;

  @Column({ nullable: true })
  lastOtp?: string;

  @Column({ nullable: true })
  phoneVerifiedAt?: Date;

  @Column({ nullable: true })
  emailVerifiedAt?: Date;

  @Exclude()
  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  rememberToken?: string;

  @OneToOne(() => Company)
  @JoinColumn()
  connectedCompany?: Company;

  @OneToMany(() => Company, (company) => company.owner)
  @JoinTable()
  companies: Company[];

  @ManyToMany(() => Company, (company) => company.users)
  @JoinTable()
  userCompanies: Company[];
}
