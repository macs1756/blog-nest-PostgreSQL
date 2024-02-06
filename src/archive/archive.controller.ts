import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { CreateArchiveDto } from './dto/create-archive.dto';
import { TOKEN } from '../../decorators/token.decorator';

@Controller('archive')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  @Post()
  create(@Body() createArchiveDto: CreateArchiveDto, @TOKEN() token) {
    return this.archiveService.create(createArchiveDto, token);
  }

  @Get()
  findAll() {
    return this.archiveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archiveService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archiveService.remove(+id);
  }
}
