import { type } from 'os';
import { Role } from 'src/roles/rolesSchema';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
  
  @OneToMany(type => Role, role => role.id)
  @JoinColumn({name: "role_id"})

  role: Role;
}

