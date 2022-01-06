import { User } from 'src/_entities';

export type UserContext = {
    req: {
      user: User;
      body: any;
    };
  };