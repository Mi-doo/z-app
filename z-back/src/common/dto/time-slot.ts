import { IsNotEmpty, IsString } from 'class-validator';

export class TimeSlotDto {
  @IsString()
  @IsNotEmpty()
  duration: string;
}
