import { IsInt, Min, Max, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class CreateMultiPurchaseDto {
  @IsInt()
  @Min(1)
  @Max(50)
  readonly quantity: number;

  @IsNotEmpty()
  readonly product: string;

  @ArrayNotEmpty()
  readonly persons: string[];

  @IsNotEmpty()
  readonly instance: string;
}
