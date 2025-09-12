import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum } from "class-validator";
import { ROLE } from "src/app/enums/user/role.enum";

export class RegisterDto {
@IsNotEmpty()
user_firstname: string;

@IsNotEmpty()
user_lastname: string;

@IsEmail()
email: string;

@IsNotEmpty()
@MinLength(6)
password: string;

@IsOptional()
@IsEnum(ROLE)
role?: ROLE;
}