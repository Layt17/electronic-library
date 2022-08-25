import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShowUserDto } from '../user/dto/user/user.dto';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto/registration.dto';
import { TokensDto } from './dto/tokens.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<ShowUserDto> {
    return await this.authService.registration(registrationDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('refresh')
  async updateTokens(@Body() tokensDto: TokensDto) {
    return await this.authService.updateTokens(tokensDto);
  }
}
