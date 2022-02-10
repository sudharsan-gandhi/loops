import { Response } from 'express';

import {
  Controller,
  Get,
  Res,
} from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {}


  @Get('/apollo')
  getApollo(@Res() res: Response) {
    res.redirect(
      'http://sandbox.apollo.dev/?endpoint=http://localhost:3000/graphql',
    );
  }

  // @Get('/test')
  // @UseGuards(AuthGuard('jwt'))
  // test(@Req() req) {
  //   return req.user;
  // }


}
