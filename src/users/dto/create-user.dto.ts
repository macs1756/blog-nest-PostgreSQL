import { Role } from "src/roles/rolesSchema";

export class CreateUserDto {
  email: string;
	password: string;
  role: Role;
}
