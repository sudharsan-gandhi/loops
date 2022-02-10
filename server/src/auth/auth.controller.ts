import { Response } from 'express';

import {
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  private clientUrl;
  private readonly console = new Logger(AuthController.name);

  constructor(protected config: ConfigService) {
    this.console.debug('Current Enviroment:', config.get<string>('ENV'));
    if (config.get<string>('ENV') === 'DEVELOPMENT') {
      this.clientUrl = 'http://localhost:3001';
    } else {
      this.clientUrl = '';
    }
  }

  @Get('/isLoggedIn')
  @UseGuards(AuthGuard('jwt'))
  async isLoggedIn(@Req() req) {
    return req.user;
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Res() res) {
    this.console.debug(req.user);
    this.attachUserCookie(req, res);
    res.redirect(this.clientUrl);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  google(@Req() req) {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleRedirect(@Req() req, @Res() res) {
    this.console.debug(req.user);
    this.attachUserCookie(req, res);
    res.redirect(this.clientUrl + '/signin');
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  facebook(@Req() req, @Res() res) {}

  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookRedirect(@Req() req, @Res() res) {
    this.console.debug(req.user);
    this.attachUserCookie(req, res);
    res.redirect('/signin');
  }

  @Get('/logout')
  logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('userId');
    res.clearCookie('user');
    res.json({});
  }

  private attachUserCookie(req, res: Response) {
    res.cookie('accessToken', req.user.accessToken);
    res.cookie('user', req.user.data);
    res.cookie('userId', req.user.data.id);
  }
}
