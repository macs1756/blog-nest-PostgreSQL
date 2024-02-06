import { Entity, Column } from 'typeorm';
import { BaseColumns } from 'utils/base';

@Entity()
export class Post extends BaseColumns {
 
  @Column()
  title: string;

  @Column()
  description: string;
}
