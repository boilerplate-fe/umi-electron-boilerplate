import * as fs from 'mz/fs';
import * as util from 'util';
import * as sharp from 'sharp';

const resizeBeforeHash = [64, 64];

interface GetImagePHashOption {
  resizeBeforeHash?: [number, number];
}

export class ImagePHash {
  static hashByAverageValueBytes(buffer: Buffer) {
    let bytesArray = [];
    let totalAmount = 0;
    if (!util.isBuffer(buffer)) {
      throw new Error('Value is not buffer!');
    }
    for (let i = 0; i < buffer.length; i++) {
      bytesArray.push(buffer.readInt8(i));
      totalAmount += buffer.readInt8(i);
    }
    let averageValue = totalAmount / buffer.length;
    return bytesArray
      .map(function(number) {
        if (averageValue > number) {
          return 1;
        }
        return 0;
      })
      .join('');
  }

  static hammingDistance(hash1: string, hash2: string) {
    let distance = Math.abs(hash1.length - hash2.length);
    for (let i = 0; i < hash1.length; i++) {
      if (hash1[i] !== hash2[i]) {
        distance++;
      }
    }
    return distance;
  }

  static compare(hash1: string, hash2: string) {
    let distance = ImagePHash.hammingDistance(hash1, hash2);
    return (distance / hash1.length) * 64;
  }

  static async getImagePHash(fileName: string, options: GetImagePHashOption = {}) {
    let resize = options.resizeBeforeHash || resizeBeforeHash;
    let fileData = await fs.readFile(fileName);
    let bufferOfPixels = await sharp(fileData)
      .resize(...resize)
      .jpeg({
        quality: 100,
      })
      .raw()
      .toBuffer();
    return ImagePHash.hashByAverageValueBytes(bufferOfPixels);
  }
}
