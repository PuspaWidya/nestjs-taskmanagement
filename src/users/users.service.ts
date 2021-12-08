import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashingPass } from 'src/common/hashing';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserDto } from './dto/create.dto';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string) {
    let data = await this.userRepository.findOne({username})

   return data
  }

  
  async create(createDto: UserDto) {
    let {password, ...rest } = createDto
    let hashPassword = await hashingPass(password)
    let newBody = {
      password : hashPassword,
      ...rest
    }
    const data = await this.userRepository.create(newBody);
    await this.userRepository.save(data);
    return rest;
  }
}
