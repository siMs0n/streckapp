import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  readonly name: string;
  @IsInt()
  readonly price: number;
  readonly available: boolean;
  @IsNotEmpty()
  readonly instance: string;
}
