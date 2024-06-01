import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class ItemAlreadyExistsException extends BaseException {
  constructor(itemReference: string) {
    super(
      `validations.general.item-already-exists`,
      HttpStatus.UNPROCESSABLE_ENTITY,
      {
        itemReference,
      },
    );
  }
}
