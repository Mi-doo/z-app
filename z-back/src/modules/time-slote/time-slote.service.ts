import { Injectable } from '@nestjs/common';
import { ISlot } from 'src/common/interfaces/slot';

import * as dayjs from 'dayjs';
import * as minMax from 'dayjs/plugin/minMax';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(minMax);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

@Injectable()
export class TimeSloteService {
  constructor() {}

  getTimeSlotes(
    busySloteA: ISlot[],
    busySloteB: ISlot[],
    duration: string,
  ): ISlot[] {
    const allBusySlots = [...busySloteA, ...busySloteB].map((s: ISlot) => ({
      start: dayjs(s.start),
      end: dayjs(s.end),
    }));

    if (allBusySlots.length === 0) {
      return [];
    }

    const start = dayjs.min(allBusySlots.map((s) => s.start))!;
    const end = dayjs.max(allBusySlots.map((s) => s.end))!;

    const callDuration = this.convertTominutes(duration);
    const days = this.slotsToWeekdays(start, end);

    const availableSlots: ISlot[] = [];

    for (const day of days) {
      const dayStart = dayjs(`${day} 09:00`);
      const dayEnd = dayjs(`${day} 18:00`);

      let slotStart = dayStart;

      while (slotStart.add(callDuration, 'minute').isSameOrBefore(dayEnd)) {
        const slotEnd = slotStart.add(callDuration, 'minute');

        const isOverlapping = allBusySlots.some(
          (s) => slotStart.isBefore(s.end) && slotEnd.isAfter(s.start),
        );

        if (!isOverlapping) {
          availableSlots.push({
            start: slotStart.format(),
            end: slotEnd.format(),
          });
        }

        slotStart = slotStart.add(callDuration, 'minute');
      }
    }

    return availableSlots;
  }

  private convertTominutes(duration: string): number {
    const [hours, minutes] = duration.split(':').map(Number);

    return hours * 60 + minutes;
  }

  private slotsToWeekdays(start: dayjs.Dayjs, end: dayjs.Dayjs): string[] {
    const workDays: string[] = [];

    let current = start.startOf('d');

    while (current.isBefore(end)) {
      const day = current.day();

      if (day >= 1 && day <= 5) {
        workDays.push(current.format('YYYY-MM-DD'));
      }

      current = current.add(1, 'day');
    }

    return workDays;
  }
}
