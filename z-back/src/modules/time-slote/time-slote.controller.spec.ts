import { Test, TestingModule } from '@nestjs/testing';
import { TimeSloteController } from './time-slote.controller';
import { BadRequestException } from '@nestjs/common';
import { TimeSloteService } from './time-slote.service';

describe('TimeSloteController', () => {
  let controller: TimeSloteController;
  let mockedService: TimeSloteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeSloteController],
      providers: [
        {
          provide: TimeSloteService,
          useValue: {
            getTimeSlotes: jest.fn(() => [{}]),
          },
        },
      ],
    }).compile();

    controller = module.get<TimeSloteController>(TimeSloteController);
    mockedService = module.get<TimeSloteService>(TimeSloteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should pass if data is correct', () => {
    const slotA = {
      buffer: Buffer.from(
        JSON.stringify([
          { start: '2025-07-01T12:00:00Z', end: '2025-07-01T14:00:00Z' },
          { start: '2025-07-02T10:00:00Z', end: '2025-07-02T11:00:00Z' },
        ]),
      ),
      mimetype: 'application/json',
    } as Express.Multer.File;

    const slotB = {
      buffer: Buffer.from(
        JSON.stringify([
          { start: '2025-07-01T12:00:00Z', end: '2025-07-01T14:00:00Z' },
          { start: '2025-07-02T10:00:00Z', end: '2025-07-02T11:00:00Z' },
        ]),
      ),
      mimetype: 'application/json',
    } as Express.Multer.File;

    const body = {
      duration: '00:30',
    };

    const result = controller.getAvailableSlots(
      {
        slotA: [slotA],
        slotB: [slotB],
      },
      body,
    );

    expect(mockedService.getTimeSlotes).toBeCalled();
    expect(result).toEqual([{}]);
  });

  it('should fail if files are missing', () => {
    const body = {
      duration: '00:40',
    };

    expect(() =>
      controller.getAvailableSlots({ slotA: [], slotB: [] }, body),
    ).toThrow(BadRequestException);
  });
});
