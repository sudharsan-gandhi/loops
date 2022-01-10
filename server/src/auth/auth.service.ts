import { compareSync } from 'bcrypt';
import { User } from 'src/_entities';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}
  async findUser(email: string): Promise<User | undefined> {
    return await User.findOne({ where: { email } });
  }

  async saveUser(userDetails: User) {
    const user = User.create(userDetails);
    return await user.save();
  }

  async validateUser(payload: any): Promise<any> {
    const user = await this.findUser(payload.email);
    if (user) {
      if (compareSync(payload.password, user.password)) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async signUser(payload: any) {
    const { password, ...dto} = payload;
    return {
      accessToken: this.jwt.sign({...dto}),
      data: dto
    };
  }
}
