export class RegistrationDto {
  email: string;
  first_name: string;
  last_name: string;
  birth: string;
  passport: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}
