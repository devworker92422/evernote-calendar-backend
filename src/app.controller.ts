import {
  Controller,
  Get,
  HttpStatus
} from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHello() {
    return {
      data: HttpStatus.OK,
      msg: "Server is running now"
    }
  }
}
