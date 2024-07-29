import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from '../../../../shared/entities/timestamp.entity';
import { User } from '../../../users/entities/user.entity';

@Entity('companies')
export class Company extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  dbName: string;

  @ManyToOne(() => User, (user) => user.companies)
  owner: User;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  logo?: string;

  @Column({ nullable: true })
  website?: string;

  @ManyToMany(() => User, (user) => user.userCompanies)
  users: User[];
}
