import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getOneByUsername(username);

    if (user) {
      if (comparePasswords(password, user.password)) return user;
    }

    return null;
  }

  async signupUser(userData: CreateUserDto) {
    return this.userService.create(userData);
  }
}
