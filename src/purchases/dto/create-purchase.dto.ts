import { IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreatePurchaseDto {
  @IsInt()
  @Min(1)
  @Max(50)
  readonly quantity: number;

  @IsNotEmpty()
  readonly productId: string;

  @IsNotEmpty()
  readonly personId: string;
}

export class CreatePopulatedPurchaseDto {
  @IsInt()
  @Min(1)
  @Max(1000)
  readonly amount: number;

  @IsInt()
  @Min(1)
  readonly unitPrice: number;

  @IsInt()
  @Min(1)
  @Max(50)
  readonly quantity: number;

  @IsNotEmpty()
  readonly productId: string;

  @IsNotEmpty()
  readonly personId: string;
}