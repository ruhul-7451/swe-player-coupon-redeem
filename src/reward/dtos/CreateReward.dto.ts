import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateRewardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  perDayLimit: number;

  @IsNotEmpty()
  @IsNumber()
  totalLimit: number;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;
}
