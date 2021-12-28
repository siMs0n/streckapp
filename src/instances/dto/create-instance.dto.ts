import { IsInt, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateInstanceDto {
  @IsNotEmpty()
  readonly name: string;
  @IsInt()
  readonly year: number;
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(4)
  readonly pin: string;
  @IsNotEmpty()
  readonly swishPhoneNumber: string;
}
