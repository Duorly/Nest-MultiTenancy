import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SigninDto } from '../dto/signin.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Auth } from '../decorators/auth.decorator';
import { User } from '../../../users/entities/user.entity';
import { ConnectedCompany } from '../../../../common/decorators/connected-company.decorator';
import { Company } from '../../companies/entities/company.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

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
  getProfile(@Auth() user: User, @ConnectedCompany() company: Company) {
    return {
      user,
      company,
    };
  }
}
