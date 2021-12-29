import { Injectable } from '@nestjs/common';
import { User } from 'src/_entities';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  async findUser(email: string): Promise<User | undefined> {
    return await User.findOne({ where: { email } });
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
}
