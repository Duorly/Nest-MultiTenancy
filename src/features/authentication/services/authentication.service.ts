import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user?.password !== pass) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const { password, ...result } = user;
    const payload = { sub: user.id, phone: user.phone, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      data: result,
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user?.password !== pass) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const { password, ...result } = user;
    return user;
  }


  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
