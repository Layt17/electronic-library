export class CreateUserDto {
  email: string;
  first_name: string;
  last_name: string;
  birth: string;
  passport: string;
  password: string;
}

export class ShowUserDto {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  birth: string;
  passport: string;
}
