import { Injectable } from '@nestjs/common';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  
  delete(login) {
    return User.destroy({
      where: { login },
    });
  }

  async add({ login, password, name, role = 'user' }) {
    //but somehow if role is not specified it sets 'user' role anyway
    if (!login || !password) {
      return;
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 3);
      return User.create({ login, password: hashedPassword, name, role });
    } catch {
      return false;
    }
  }

  get({ login }) {
    if (!login) {
      return;
    }
    return User.findOne({ where: { login } });
  }
}
