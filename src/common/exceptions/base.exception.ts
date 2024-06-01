import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  args?: Record<string, any> = {};

  constructor(
    errorMessage: string,
    statusCode: HttpStatus,
    args: Record<string, any> = {},
  ) {
    super(errorMessage, statusCode);
    this.args = args;
  }
}
