import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BaseException } from './base.exception';

export class SchemaValidationException extends BaseException {
  @ApiProperty({
    name: 'errorMessage',
    description:
      'Field containing the description of the current validation error.',
  })
  errorMessage: string;

  constructor(errorMessage: string, path?: string, args?: Record<string, any>) {
    super(errorMessage, HttpStatus.UNPROCESSABLE_ENTITY, args);
    this.args['propertyPath'] = path;
  }
}
