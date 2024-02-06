import { HttpException, Injectable } from '@nestjs/common';
import { writeFile } from 'fs';
import * as fs from 'fs-extra';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
  ) {}

  async create(file: Express.Multer.File) {

    try {
     
      const uploadFolder = `uploads/${Date.now()}`
      await fs.ensureDir(uploadFolder)
      const url = `${uploadFolder}/${file.originalname}`

      await writeFile(url, file.buffer, (err) => {
        if (err) throw new HttpException(`Error writing to file: ${err}`, 500) 
      });

      const newUploadInfomation = this.uploadRepository.create({name: file.originalname, url })
      this.uploadRepository.save(newUploadInfomation)
      return newUploadInfomation

    } catch (error) {
      throw new HttpException(error, 500)
    } 
   
  }

  findAll() {
    return this.uploadRepository.find();
  }

  async findOne(id: number) {
      const file = await this.uploadRepository.find({ where: { id }});

      if(!file[0]){
        throw new HttpException('File not found', 404)
      }
      return file
  }
}
