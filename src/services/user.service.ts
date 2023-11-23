import { Injectable } from '@nestjs/common';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { log } from 'console';

@Injectable()
export class UserService {
  
  delete(login) {
    return User.destroy({
      where: { login },
    });
  }

  async add({ login, password, name, role = 'user' }) {
    console.log(login, password,name,role);
    //but somehow if role is not specified it sets 'user' role anyway
    if (!login || !password) {
      return;
    }
    log('smth1');
    try {
      const hashedPassword = await bcrypt.hash(password, 3);
      log('smth2');

      return User.create({ login, password: hashedPassword, name, role });
    } catch {
      log('smth3');

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
