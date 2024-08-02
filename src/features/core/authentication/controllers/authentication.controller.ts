import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SigninDto } from '../dto/signin.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Auth } from '../decorators/auth.decorator';
import { User } from '../../../users/entities/user.entity';
import { PhoneSignupDto } from '../dto/phone-signup.dto';
import { PhoneValidationPipe } from '../../../../common/pipes/phone-validation.pipe';
import { EmailSignupDto } from '../dto/email-signup.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiOperation({
    summary: 'Register a new user with phone number',
    description: 'Register a new user with phone number and send OTP by SMS',
  })
  @Post('/phone/signup')
  async signUpWithPhone(
    @Body(new PhoneValidationPipe()) phoneSignupDto: PhoneSignupDto,
  ) {
    return await this.authenticationService.signUpWithPhone(phoneSignupDto);
  }

  @ApiOperation({
    summary: 'Register a new user with email',
    description: 'Register a new user with email and send OTP by email',
  })
  @Post('/email/signup')
  async signUPWithMail(@Body() emailSignupDto: EmailSignupDto) {
    return await this.authenticationService.signUpWithEmail(emailSignupDto);
  }

  @Post('/email/signin')
  async signInWithEmail(@Body() signinDto: SigninDto) {
    return await this.authenticationService.signIn(
      signinDto.email,
      signinDto.password,
    );
  }

  @Post('/phone/signin')
  async signInWithPhone(@Body() signinDto: SigninDto) {
    return await this.authenticationService.signIn(
      signinDto.email,
      signinDto.password,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getProfile(@Auth() user: User) {
    return {
      user,
    };
  }
}
