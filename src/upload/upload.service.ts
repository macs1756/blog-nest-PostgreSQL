import { HttpException, Injectable } from '@nestjs/common';
import { writeFile } from 'fs';
import { CreateUploadDto } from './dto/create-upload.dto';
import * as fs from 'fs-extra';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
  ) { }

  async create(file: Express.Multer.File, createUploadDto: CreateUploadDto) {


    try {
      
      const { folder } = createUploadDto
      const uploadFolder = `uploads/${folder + Date.now()}`
      await fs.ensureDir(uploadFolder)


      const url = `${uploadFolder}/${file.originalname}`

    
      // await writeFile(url, file.buffer, (err) => {
      //   if (err) throw new HttpException(`Error writing to file: ${err}`, 500) 
      // });

      const newUploadInfomation = this.uploadRepository.create()

      newUploadInfomation.name = 'test'
      newUploadInfomation.url = 'tst'

      this.uploadRepository.save(newUploadInfomation)

      return newUploadInfomation

    } catch (error) {
      throw new HttpException(error, 500)
    } 
   


  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

}
