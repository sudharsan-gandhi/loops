import { UploadedFile } from 'adminjs';
import * as fs from 'fs';
import { existsSync } from 'fs';
import * as path from 'path';

import {
  BaseProvider,
  LocalUploadOptions,
} from '@adminjs/upload';
import {
  Inject,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class StorageEngineService extends BaseProvider {
  constructor(@Inject('OPTIONS') options: LocalUploadOptions) {
    super(options.bucket);
    if (!existsSync(options.bucket)) {
      throw new Error(
        `directory: "${options.bucket}" does not exists. Create it before running LocalAdapter`,
      );
    }
  }

  public async upload(file: UploadedFile, key: string): Promise<any> {
    const filePath =
      process.platform === 'win32'
        ? this.pathWithPrefix(key)
        : this.pathWithPrefix(key).slice(1); // adjusting file path according to OS

    if ((file as any as Express.Multer.File).buffer) {
      const f = file as any as Express.Multer.File;
      const stream = fs.createWriteStream(filePath);
      stream.write(f.buffer);
      stream.close();
      return;
    }
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.rename(file.path, filePath);
  }

  public async delete(key: string, bucket: string): Promise<any> {
    // await fs.promises.unlink(
    //   process.platform === 'win32'
    //     ? this.pathWithPrefix(key, bucket)
    //     : this.pathWithPrefix(key, bucket).slice(1),
    // ); // adjusting file path according to OS
  }

  // eslint-disable-next-line class-methods-use-this
  public path(key: string, bucket?: string): string {
    // Windows doesn't requires the '/' in path, while UNIX system does
    if (!key.startsWith('http')) {
      return `/${path.join(bucket || this.bucket, key)}`;
    } else return key;
  }
  public pathWithPrefix(key: string, bucket?: string): string {
    // Windows doesn't requires the '/' in path, while UNIX system does
    if (!key.startsWith('http')) {
      return `${path.join(bucket || this.bucket, key)}`;
    } else return key;
  }
}
