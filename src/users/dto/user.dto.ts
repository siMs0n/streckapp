import { IsString, MinLength, MaxLength } from 'class-validator';

export class UserDTO {
  @IsString()
  userId: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}
