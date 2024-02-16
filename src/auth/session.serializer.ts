import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UsersService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user._id);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.userService.getOne(payload);
    done(null, user);
  }
}
