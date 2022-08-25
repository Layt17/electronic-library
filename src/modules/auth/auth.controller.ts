import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ShowUserDto } from '../user/dto/user/user.dto';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto/registration.dto';
import { TokensDto } from './dto/tokens.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @ApiOkResponse({
    type: RegistrationDto,
    description: 'Registration',
  })
  async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<ShowUserDto> {
    return await this.authService.registration(registrationDto);
  }

  @Post('login')
  @ApiOkResponse({
    type: TokensDto,
    description: 'Login',
  })
  async login(@Body() loginDto: LoginDto): Promise<TokensDto> {
    return await this.authService.login(loginDto);
  }

  @Post('refresh')
  @ApiOkResponse({
    type: TokensDto,
    description: 'Update tokens',
  })
  async updateTokens(@Body() tokensDto: TokensDto): Promise<TokensDto> {
    return await this.authService.updateTokens(tokensDto);
  }
}
