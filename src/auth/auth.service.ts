import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePass } from 'src/common/hashing';
import { FilterException } from 'src/common/filterException';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const test = await comparePass(password, user.password)
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * this function used to login
   * user get from jwt verify
   * 
   * @param user 
   * @returns 
   */


  async login(user: any) {
try{
    const checkUser = await this.userService.findOne(user.username)
    const compare = await comparePass(user.password, checkUser.password)
    if(compare){
      const payload = { username: user.username, userId: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

  }
  catch(err){
    throw new FilterException(err)
  }
  }
}
