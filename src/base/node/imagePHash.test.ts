import { join } from 'path';
import { ImagePHash } from './imagePHash';

describe('test ImagePHash', () => {
  function fixture(name: string) {
    return join(__dirname, 'fixture', name);
  }

  it('test hammingDistance', async () => {
    const hash1 = await ImagePHash.getImagePHash(fixture('1.jpg'));
    const hash2 = await ImagePHash.getImagePHash(fixture('2.jpg'));
    const hash3 = await ImagePHash.getImagePHash(fixture('3.jpg'));

    /** 缩放 */
    expect(ImagePHash.compare(hash1, hash3)).toBeLessThan(4);
    expect(ImagePHash.compare(hash1, hash2)).toBeLessThan(4);
  });
});
