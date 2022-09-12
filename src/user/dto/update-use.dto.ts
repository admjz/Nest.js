import { IsOptional, IsString } from "class-validator";

export class updateUserDto {
  @IsString()
  @IsOptional()
  nickName?: string;
}