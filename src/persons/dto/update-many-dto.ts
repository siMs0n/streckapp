import { IsNotEmpty, IsInt } from 'class-validator';

export class UpdateManyDto {
  @IsNotEmpty()
  readonly _id: string;
  @IsInt()
  readonly balance: number;
}
