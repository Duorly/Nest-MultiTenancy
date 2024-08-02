import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PhoneSignupDto } from '../dto/phone-signup.dto';
import { EmailSignupDto } from '../dto/email-signup.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    if (!(await bcrypt.compare(pass, user?.password))) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    delete user.password;

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        phone: user.phone,
        email: user.email,
      }),
      data: user,
    };
  }

  async signUpWithPhone(phoneSignupDto: PhoneSignupDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { phone: phoneSignupDto.phone },
    });

    if (user) {
      throw new BadRequestException('Utilisateur existant');
    }

    const newUser = this.usersRepository.create({
      phone: phoneSignupDto.phone,
      username: phoneSignupDto.username,
    });

    await this.usersRepository.save(newUser);

    return {
      message: 'Utilisateur créé avec succès',
      data: newUser,
    };
  }

  async signUpWithEmail(emailSignupDto: EmailSignupDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: emailSignupDto.email },
    });

    if (user) {
      throw new BadRequestException('Utilisateur existant');
    }

    emailSignupDto.password = await bcrypt.hash(
      emailSignupDto.password,
      Number(this.configService.getOrThrow<number>('SALT_ROUNDS')),
    );

    const newUser = this.usersRepository.create({
      email: emailSignupDto.email,
      username: emailSignupDto.username,
      password: emailSignupDto.password,
    });

    await this.usersRepository.save(newUser);

    delete newUser.password;

    return {
      message: 'Utilisateur créé avec succès',
      data: newUser,
    };
  }
}
