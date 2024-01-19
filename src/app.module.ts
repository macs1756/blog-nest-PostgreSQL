import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { Post } from './post/postSchema';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/rolesSchema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4444,
      username: 'postgres',
      password: 'admin',
      database: 'blog',
      entities: [Post, Role],
      synchronize: true,
    }),
    PostModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
