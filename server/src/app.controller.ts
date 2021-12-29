import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/apollo')
  getApollo(@Res() res: Response) {
    res.redirect(
      'http://sandbox.apollo.dev/?endpoint=http://localhost:3000/graphql',
    );
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req) {
    return req.user;
  }

  @Get('/test')
  @UseGuards(AuthGuard('jwt'))
  test(@Req() req) {
    return req.user;
  }
}
