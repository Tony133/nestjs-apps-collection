import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FileUploadService {
  async createFile(file: any): Promise<string> {
    try {
      const fileName = uuid.v4(file.filename) + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'upload');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, file.filename), file.filename);

      return fileName;
    } catch (e) {
      throw new HttpException(
        'Error: An error occurred while writing the file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
