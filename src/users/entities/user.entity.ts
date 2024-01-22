import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from 'src/roles/rolesSchema';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Role, role => role.type)
  role: Role[]
}

