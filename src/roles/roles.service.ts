import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {

    const newRole = this.roleRepository.create();

    newRole.type = createRoleDto.type
    newRole.description = createRoleDto.description ? createRoleDto.description : ''

    newRole.users = []

    const userArr = createRoleDto.users

    for (const id of userArr) {
      const currentUser = await this.userRepository.findOne({where: { id }});
      
      if (currentUser) {
        newRole.users.push(currentUser);
      }
    }

    return this.roleRepository.save(newRole);
  }

  findAll() {
    return this.roleRepository.find({relations: ['users']});
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} ${updateRoleDto} role`;
  }

  async remove(id: number) {

    const user = await this.roleRepository.findOne({where: { id }});
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.roleRepository.delete(id);

    return 'Delete is Successful'
  }
}
