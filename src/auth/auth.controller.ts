import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Msg } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('/signup')
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<Msg> {
    const jwt = await this.authService.login(dto);
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/'
    });

    return {
      message: 'ログインしました。'
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  async logout(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<Msg> {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/'
    });

    return {
      message: 'ログアウトしました。'
    }
  }
}
