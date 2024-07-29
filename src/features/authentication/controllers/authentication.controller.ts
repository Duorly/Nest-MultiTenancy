import { Body, Request, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SigninDto } from '../dto/signin.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {
  }

  @Post('signin')
  async signIn(
    @Body() signinDto: SigninDto,
  ) {
    return await this.authenticationService.signIn(signinDto.email, signinDto.password);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
