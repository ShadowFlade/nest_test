import { Injectable } from '@nestjs/common';
import { User } from '../models/User.js';
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
    //but somehow if role is not specified it sets 'user' role anyway
    if (!login || !password) {
      return;
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 3);

      return User.create({
        login,
        password: hashedPassword,
        name,
        role,
        cratedAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString(),
      });
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
