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
    const result = await User.upsert<User>(userDetails, {
      conflictPaths: ['email'],
    });
    if (result && result.identifiers.length > 0) {
      const user = await User.findOne({
        where: { id: result.identifiers[0].id },
      });
      return user;
    }
    return null;
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
    const { password, ...dto } = payload;
    return {
      accessToken: this.jwt.sign({ ...dto }),
      data: dto,
    };
  }

  async verifyToken(token: string) {
    return this.jwt.verify(token);
  }
}
