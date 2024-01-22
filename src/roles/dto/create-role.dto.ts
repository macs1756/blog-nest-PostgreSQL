import { User } from "src/users/entities/user.entity";

export class CreateRoleDto {
  type: string;
  description?: string;
  users: number[];
}
