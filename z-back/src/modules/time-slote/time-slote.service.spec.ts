import { Test, TestingModule } from '@nestjs/testing';
import { TimeSloteService } from './time-slote.service';

describe('TimeSloteService', () => {
  let service: TimeSloteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeSloteService],
    }).compile();

    service = module.get<TimeSloteService>(TimeSloteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return empty arrray if files don't contain data", () => {
    const file1 = [];

    const file2 = [];

    const result = service.getTimeSlotes(file1, file2, '01:00');

    expect(result).toEqual([]);
  });

  it('should print correct available slots', () => {
    const file1 = [
      {
        start: '2022-08-01T09:00:00',
        end: '2022-08-01T11:00:00',
      },
      {
        start: '2022-08-01T12:00:00',
        end: '2022-08-01T13:00:00',
      },
      {
        start: '2022-08-01T15:00:00',
        end: '2022-08-01T18:00:00',
      },
      {
        start: '2022-08-02T09:00:00',
        end: '2022-08-02T10:00:00',
      },
    ];

    const file2 = [
      {
        start: '2022-08-01T09:00:00',
        end: '2022-08-01T14:00:00',
      },
      {
        start: '2022-08-02T09:00:00',
        end: '2022-08-02T14:00:00',
      },
    ];

    const result = service.getTimeSlotes(file1, file2, '01:00');

    expect(result).toEqual([
      {
        start: '2022-08-01T14:00:00+02:00',
        end: '2022-08-01T15:00:00+02:00',
      },
      {
        start: '2022-08-02T14:00:00+02:00',
        end: '2022-08-02T15:00:00+02:00',
      },
      {
        start: '2022-08-02T15:00:00+02:00',
        end: '2022-08-02T16:00:00+02:00',
      },
      {
        start: '2022-08-02T16:00:00+02:00',
        end: '2022-08-02T17:00:00+02:00',
      },
      {
        start: '2022-08-02T17:00:00+02:00',
        end: '2022-08-02T18:00:00+02:00',
      },
    ]);
  });
});
