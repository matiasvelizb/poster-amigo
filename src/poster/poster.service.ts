import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PosterService {
  private readonly postersFolder: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.postersFolder = path.join(
      __dirname,
      '..',
      '..',
      this.configService.get<string>('POSTERS_FOLDER'),
    );

    if (!fs.existsSync(this.postersFolder)) {
      fs.mkdirSync(this.postersFolder);
    }
  }

  async downloadImage(imageUrl: string, id: number): Promise<string> {
    const extension = path.extname(imageUrl);
    const newFileName = `${id}${extension}`;
    const filePath = path.join(this.postersFolder, newFileName);
    const servingUrl = `/posters/${newFileName}`;

    if (fs.existsSync(filePath)) {
      return servingUrl;
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(imageUrl, { responseType: 'arraybuffer' }),
      );
      fs.writeFileSync(filePath, response.data);
    } catch (error) {
      console.error(`Failed to download image: ${error.message}`);
    }

    return servingUrl;
  }
}
