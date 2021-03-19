import {
  Controller,
  Get,
  Post,
  Patch,
  Query,
  Delete,
  Body,
  Param,
  Headers,
  UseGuards,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ParseIntPipe } from '../../common/pipes/parse-int.pipe'
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { HelloService } from './hello.service';
import { Hello, UserRole } from './classes/hello'; // swagger示例

@ApiBearerAuth()
@ApiTags('hello')
@UseGuards(RolesGuard)
@Controller('/hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  // 查询
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles(['admin', 'user'])
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'id', required: true })
  @ApiQuery({ name: 'role', enum: UserRole })
  @ApiResponse({ // swagger 成功返回
    status: 200,
    description: 'get 请求成功',
    type: Hello,
  })
  fetch(@Query() { name, id }, @Headers('token') token): string {
    if (!id) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, message: '请求参数id 必传', error: 'id is required' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.helloService.fetch(name, id);
  }

  // 创建
  @Post()
  @ApiBody({ description: '填写更新内容' })
  save(@Body() { message }): string {
    return this.helloService.save(message);
  }

  // 更新
  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ description: '请输入message' })
  update(@Param('id', new ParseIntPipe()) id, @Body() { message }): string {
    return this.helloService.update(id, message);
  }

  // 删除
  @Delete()
  remove(@Query() { id }): string {
    return this.helloService.remove(id);
  }
}
