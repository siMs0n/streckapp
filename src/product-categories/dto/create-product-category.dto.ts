import { IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly instance: string;
}
