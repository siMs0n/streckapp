import { IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  @Min(1)
  @Max(1000)
  readonly amount: number;

  @IsNotEmpty()
  readonly reference: string;

  @IsNotEmpty()
  readonly person: string;
}
