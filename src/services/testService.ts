import { Get, JsonController, QueryParams } from 'routing-controllers';
import { ImagePHash } from 'root/base/node/imagePHash';

@JsonController('/TestService')
export class TestService {
  @Get('/hello')
  async hello() {
    return 'Hello World';
  }

  @Get('/imagePHash')
  async imagePHash(@QueryParams({ parse: true }) query: { path: string }) {
    return ImagePHash.getImagePHash(query.path);
  }
}
