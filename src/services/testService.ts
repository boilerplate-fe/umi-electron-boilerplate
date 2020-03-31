import { Get, JsonController, QueryParams } from 'routing-controllers';
import { ImagePHash } from 'root/base/node/imagePHash';
import getmac from 'getmac';

@JsonController('/TestService')
export class TestService {
  @Get('/hello')
  async hello() {
    return `Hello World ${getmac()}`;
  }

  @Get('/imagePHash')
  async imagePHash(@QueryParams({ parse: true }) query: { path: string }) {
    return ImagePHash.getImagePHash(query.path);
  }
}
