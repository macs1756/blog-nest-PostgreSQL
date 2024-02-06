import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseColumns } from 'utils/base';

@Entity()
export class Role extends BaseColumns {
  
  @Column()
  type: string;

  @Column()
  description: string;

  @ManyToMany(() => User, user => user.id)
  @JoinTable()
  users: User[]

}