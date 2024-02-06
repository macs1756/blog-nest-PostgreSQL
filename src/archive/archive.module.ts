import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { ArchiveController } from './archive.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Archive } from './entities/archive.entity';
import checkAuth from '../../middleware/checkAuth'

@Module({
  imports: [TypeOrmModule.forFeature([Archive]), ConfigModule.forRoot()],
  controllers: [ArchiveController],
  providers: [ArchiveService],
})
export class ArchiveModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkAuth)
      .forRoutes({ path: 'archive', method: RequestMethod.POST });
  }
}
