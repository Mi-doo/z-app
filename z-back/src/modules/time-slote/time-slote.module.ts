import { Module } from '@nestjs/common';
import { TimeSloteController } from './time-slote.controller';
import { TimeSloteService } from './time-slote.service';

@Module({
  controllers: [TimeSloteController],
  providers: [TimeSloteService]
})
export class TimeSloteModule {}
