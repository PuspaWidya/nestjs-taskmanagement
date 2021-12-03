import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    return this.userRepository.findOne({ username });
  }

  async create(createDto: UserDto) {
    const data = await this.userRepository.create(createDto);
    await this.userRepository.save(data);
    return data;
  }
}
