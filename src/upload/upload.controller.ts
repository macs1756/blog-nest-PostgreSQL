import { Controller, Get, Post,  Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';


@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}



  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    ) {
    return this.uploadService.create(file);
  }



  @Get()
  findAll() {
    return this.uploadService.findAll();
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

}
