import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './postSchema';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const newUser = this.postRepository.create(createPostDto);
    return this.postRepository.save(newUser);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const updateElement = await this.postRepository.findOne({ where: { id } });

    if (updateElement) {
      const updatedUser = { ...updateElement, ...updatePostDto };

      await this.postRepository.save(updatedUser);
      return updatedUser;
    } else {
      return 'Not found post';
    }
  }

  async remove(id: number) {
    await this.postRepository.delete(id);
    return { message: 'User deleted successfully' };
  }
}
