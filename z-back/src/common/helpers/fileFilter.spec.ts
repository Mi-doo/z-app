import { BadRequestException } from '@nestjs/common';
import fileFilter from './fileFilter';

describe('fileFilter', () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    mockCallback.mockReset();
  });

  it('should pass valid .json files with application/json mimetype', () => {
    const file = {
      mimetype: 'application/json',
      originalname: 'valid-file.json',
    } as Express.Multer.File;

    fileFilter(null, file, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(null, true);
  });

  it('should fail  files with invalid mimetype', () => {
    const file = {
      mimetype: 'text/plain',
      originalname: 'test.json',
    } as Express.Multer.File;

    fileFilter(null, file, mockCallback);

    expect(mockCallback).toHaveBeenCalled();
    const [error, acceptFile] = mockCallback.mock.calls[0];
    expect(error).toBeInstanceOf(BadRequestException);
    expect(error.message).toEqual(
      'Invalid file type. Only JSON files are allowed.',
    );
    expect(acceptFile).toBe(false);
  });

  it('should fail files with invalid extension', () => {
    const file = {
      mimetype: 'application/json',
      originalname: 'data.txt',
    } as Express.Multer.File;

    fileFilter(null, file, mockCallback);

    expect(mockCallback).toHaveBeenCalled();
    const [error, acceptFile] = mockCallback.mock.calls[0];
    expect(error).toBeInstanceOf(BadRequestException);
    expect(error.message).toEqual(
      'Invalid file extension. Only .json files are allowed.',
    );
    expect(acceptFile).toBe(false);
  });
});
