import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }


  // -------------------------------------REGISTER-----------------------------------------------------
  async create(createUserDto: CreateUserDto) {

    const newUser = this.userRepository.create();

    newUser.email = createUserDto.email
    newUser.password = createUserDto.password
    newUser.roles = []

    const roleArr = createUserDto.roles

    for (const type of roleArr) {

      const currentRole = await this.roleRepository.findOne({ where: { type } });

      if (currentRole) {
        newUser.roles.push(currentRole);
      }
    }


    try {
      const savedUser = await this.userRepository.save(newUser);

      for (const type of roleArr) {
        const currentRole = await this.roleRepository.findOne({
          where: { type },
          relations: ['users'], 
        });
  
        if (currentRole) {
          currentRole.users.push(savedUser);
          await this.roleRepository.save(currentRole);
        } 
      }
      
      return savedUser;
    } catch (error) {
      console.error('Error saving user:', error.message);
      throw new Error('Could not save user.');
    }
  }
// -------------------------------------REGISTER-----------------------------------------------------

  findAll() {
    return this.userRepository.find({ relations: ['roles'] })
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(id);

    return 'Delete is Successful'
  }
}
