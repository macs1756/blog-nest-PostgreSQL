import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
     
    

    const newUser = this.userRepository.create(createUserDto);
    try {
      const savedUser = await this.userRepository.save(newUser);
  
      return savedUser;
    } catch (error) {
      // Обробка помилки, якщо щось пішло не так під час збереження
      console.error('Error saving user:', error.message);
      throw new Error('Could not save user.');
    }
  }
  

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {

    const user = await this.userRepository.findOne({where: { id }});
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(id);

    return 'Delete is Successful'
  }
}
