import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { ArchiveController } from './archive.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Archive } from './entities/archive.entity';
import checkAuth from '../../middleware/checkAuth'
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Archive, User]), ConfigModule.forRoot()],
  controllers: [ArchiveController],
  providers: [ArchiveService, checkAuth],
})
export class ArchiveModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkAuth)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
