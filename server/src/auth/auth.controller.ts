import { Response } from 'express';
import { ENTITIES } from 'src/entities';

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

import {
  AccessControlService,
  AuthPossesion,
} from './service/access-control.service';

@Controller('auth')
export class AuthController {
  private clientUrl;
  private readonly console = new Logger(AuthController.name);

  constructor(
    protected config: ConfigService,
    private acl: AccessControlService,
  ) {
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
    const referer = this.getReferer(req);
    this.attachUserCookie(req, res);
    res.redirect(referer);
  }

  @Post('/login/admin')
  @UseGuards(AuthGuard('local'))
  async loginAdmin(@Req() req, @Res() res) {
    this.console.debug(req.user);
    this.attachUserCookie(req, res);
    return req.user;
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  google(@Req() req) {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleRedirect(@Req() req, @Res() res) {
    this.console.debug(req.user);
    const referer = this.getReferer(req);
    this.attachUserCookie(req, res);
    res.redirect(referer);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  facebook(@Req() req, @Res() res) {}

  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookRedirect(@Req() req, @Res() res) {
    this.console.debug(req.user);
    const referer = this.getReferer(req);
    this.attachUserCookie(req, res);
    res.redirect(referer);
  }

  @Get('/logout')
  logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('userId');
    res.clearCookie('user');
    res.json({});
  }

  @Get('/access')
  @UseGuards(AuthGuard('jwt'))
  accessList(@Req() req, @Res() res: Response) {
    this.console.log('fetching accesslist', req.user.role);
    this.getAccessList(req)
      .then((accessList) => {
        this.console.log('accesslist', JSON.stringify(accessList, null, 2));
        res.json(accessList);
      })
      .catch((err) => {
        this.console.error(err);
        res.status(400).send('something went wrong');
      });
  }

  async getAccessList(req) {
    const actions = ['read', 'update', 'delete', 'create'];
    const accessList = {};

    for (let entity of ENTITIES) {
      let actionObj = {};
      for (let action of actions) {
        const bool = await this.acl.allowed(
          req?.user?.role || 'guest',
          entity.name.toLowerCase(),
          action,
          AuthPossesion.ANY,
        );
        actionObj = { ...actionObj, ...{ [action]: bool } };
      }
      accessList[entity.name.toLowerCase()] = actionObj;
    }
    return accessList;
  }

  private attachUserCookie(req, res: Response) {
    res.cookie('accessToken', req.user.accessToken);
    res.cookie('user', req.user.data);
    res.cookie('userId', req.user.data.id);
  }

  private getReferer(req: any) {
    const referer =
      req?.headers?.referer ||
      (req?.headers?.host ? req?.headers?.host + '/signin' : undefined);
    if (referer?.length > 0) {
      return referer;
    } else {
      this.clientUrl + '/signin';
    }
  }
}
