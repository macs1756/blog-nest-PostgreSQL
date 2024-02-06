import { Role } from 'src/roles/entities/role.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseColumns } from 'utils/base';


@Entity()
export class User extends BaseColumns{
 
  @Column()
  email: string;

  @Column()
  password: string;
  

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[]

}

