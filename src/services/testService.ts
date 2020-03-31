import { Get, JsonController } from 'routing-controllers';

@JsonController('/TestService')
export class TestService {
  @Get('/hello')
  async hello() {
    return 'Hello World';
  }
}
