import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';


@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}



  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMediaDto:  CreateUploadDto
    ) {
    return this.uploadService.create(file, createMediaDto);
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
