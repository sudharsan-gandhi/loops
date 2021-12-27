import { Controller, Get, Res } from '@nestjs/common';
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
}
