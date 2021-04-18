import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class UpdateSettingsDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(4)
  readonly pin: string;
  @IsNotEmpty()
  readonly swishPhoneNumber: string;
}
