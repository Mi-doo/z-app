import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TimeSloteService } from './time-slote.service';
import { ISlot } from 'src/common/interfaces/slot';
import fileFilter from '../../common/helpers/fileFilter';
import { TimeSlotDto } from '../../common/dto/time-slot';

@Controller('time-slote')
export class TimeSloteController {
  constructor(private readonly timeSloteService: TimeSloteService) {}

  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'slotA', maxCount: 1 },
        { name: 'slotB', maxCount: 1 },
      ],
      {
        fileFilter,
      },
    ),
  )
  getAvailableSlots(
    @UploadedFiles()
    files: { slotA: Express.Multer.File[]; slotB: Express.Multer.File[] },
    @Body() body: TimeSlotDto,
  ): ISlot[] {
    if (!files?.slotA?.length || !files?.slotB?.length) {
      throw new BadRequestException('Both files are required.');
    }

    const slotA = JSON.parse(files.slotA[0].buffer.toString('utf8')) as ISlot[];
    const slotB = JSON.parse(files.slotB[0].buffer.toString('utf8')) as ISlot[];

    return this.timeSloteService.getTimeSlotes(slotA, slotB, body.duration);
  }
}
