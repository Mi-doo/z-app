import { validate } from 'class-validator';
import { TimeSlotDto } from './time-slot';

describe('TimeSlotDto', () => {
  it('should fail if duration is missing', async () => {
    const dto = new TimeSlotDto();
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('duration');
  });

  it('should fail if duration is an empty string', async () => {
    const dto = new TimeSlotDto();
    dto.duration = '';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('duration');
  });

  it('should pass if duration is a valid non-empty string', async () => {
    const dto = new TimeSlotDto();
    dto.duration = '10 minutes';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
