import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

// 将输入的值转化成number类型，如果 !isNaN抛错
@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('id must be number');
    }
    return val;
  }
}
