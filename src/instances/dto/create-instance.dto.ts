import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateInstanceDto {
  @IsNotEmpty()
  readonly name: string;
  @IsInt()
  readonly year: number;
  @IsOptional()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(4)
  readonly pin: string;
  @IsOptional()
  @IsNotEmpty()
  readonly swishPhoneNumber: string;
}
