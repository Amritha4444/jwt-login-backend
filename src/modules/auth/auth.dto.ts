import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email!: string;

  @IsString()
  @MinLength(1, { message: 'Password is required.' })
  password!: string;
}

export class SignupDto {
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email!: string;

  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long.'
  })
  password!: string;
}