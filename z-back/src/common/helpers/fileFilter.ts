import { BadRequestException } from '@nestjs/common';

export default function fileFilter(
  _,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) {
  const allowedMimeTypes = ['application/json', 'application/octet-stream'];
  const allowedExtensions = ['.json'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(
      new BadRequestException(
        'Invalid file type. Only JSON files are allowed.',
      ),
      false,
    );
  }

  const ext = file.originalname
    .slice(file.originalname.lastIndexOf('.'))
    .toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return callback(
      new BadRequestException(
        'Invalid file extension. Only .json files are allowed.',
      ),
      false,
    );
  }

  callback(null, true);
}
