import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateArchiveDto } from './dto/create-archive.dto';
import { Archive } from './entities/archive.entity';


@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Archive)
    private archiveRepository: Repository<Archive>,
  ) { }

  async create(createArchiveDto: CreateArchiveDto, token) {
    try {

      const currentUser = await this.userRepository.find({ where: { id: token.id } })
      const greeting = `Login is performed through ${currentUser[0].email}`

      const newArchiveElement = this.archiveRepository.create(createArchiveDto)
      await this.archiveRepository.save(newArchiveElement)

      return { greeting, archive: newArchiveElement };

    } catch (error) {
      throw new HttpException("Error on server", 500);
    }
  }

  findAll() {
    return this.archiveRepository.find()
  }

  async findOne(id: number) {
    const archiveInfo = await this.archiveRepository.find({ where: { id }})

    if(!archiveInfo[0]?.id){
      throw new HttpException("Error on server", 404);
    }
    return archiveInfo
  }

  remove(id: number) {
    return `This action removes a #${id} archive`;
  }
}
