import { IsNotEmpty, IsInt } from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty()
  readonly name: string;
  @IsInt()
  readonly balance: number;
  @IsNotEmpty()
  readonly instance: string;
}
