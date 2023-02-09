import { ParseIntPipe } from './parse-int.pipe';
import { BadRequestException } from '@nestjs/common';

describe('ParseIntPipe', () => {
  let pipe: ParseIntPipe;
  
  beforeEach(() => {
    pipe = new ParseIntPipe();
  });

  describe('successful calls', () => {
    it('should be defined', () => {
      expect(new ParseIntPipe()).toBeDefined();
    });

    it('should check validation id', () => {
      expect(pipe.transform('1')).toBe('1');
    });
  });
  describe('unsuccessful calls', () => {
    it('should throw an error if given a non-number string', () => {
      expect(() => pipe.transform('true')).toThrowError(BadRequestException);
      expect(() => pipe.transform('true')).toThrowError(
        'Validation failed. Id parameter should be a number "NaN".',
      );
    });
  });
  
});
