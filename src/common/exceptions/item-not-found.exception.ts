import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class ItemNotFoundException extends BaseException {
  constructor(itemReference: string | number) {
    super(`validations.general.item-not-found`, HttpStatus.NOT_FOUND, {
      itemReference,
    });
  }
}
