import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs';
import { CreateUploadDto } from './dto/create-upload.dto';
import * as fs from 'fs-extra';


@Injectable()
export class UploadService {


  async create(file: Express.Multer.File, createUploadDto: CreateUploadDto) {

    const { name } = createUploadDto

    const uploadFolder = `/uploads/${name}`

    await fs.ensureDir(uploadFolder)
    
    
    try {
      await fs.ensureDir(uploadFolder);
      console.log('Folder created successfully');
    } catch (err) {
      console.error('Error creating folder:', err);
      throw err; // Rethrow the error or handle it appropriately
    }

    const url = `${uploadFolder}/${file.originalname}`

    await writeFile(url, file.buffer, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return;
      }
      return {file, url}
    })

    ;
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

}
