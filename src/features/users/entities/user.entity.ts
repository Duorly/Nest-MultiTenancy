import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../../shared/entities/timestamp.entity';
import { IsEmail } from 'class-validator';

@Entity('users')
export class User extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  username?: string;

  @Index({ unique: true })
  @Column()
  phone: string;

  @Index({ unique: true })
  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  lastOtp?: string;

  @Column({ nullable: true })
  phoneVerifiedAt?: Date;

  @Column({ nullable: true })
  emailVerifiedAt?: Date;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  rememberToken?: string;
}
