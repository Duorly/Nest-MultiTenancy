import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
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
}
