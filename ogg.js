
import axios from 'axios';
import ffmpeg from 'fluent-ffmpeg';
import installer from '@ffmpeg-installer/ffmpeg';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import { removeFiles } from './utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

class Ogg_Converter {
    constructor() {
        ffmpeg.setFfmpegPath(installer.path);
    }

    toMp3(input, output) {
        try {
            const outputPath = resolve(dirname(input), `${output}.mp3`);
            return new Promise((resolve, reject) => {
                ffmpeg(input)
                    .inputOption('-t 30')
                    .output(outputPath)
                    .on('end', () => {
                        removeFiles(input);
                        resolve(outputPath);
                    })
                    .on('error', (err) => reject(err.message))
                    .run();
            });
        } catch (e) {
            console.log("Error while creating MP3 file", e.message);
        }
    }

    async create(url, filename) {
        try {
            const oggPath = resolve(__dirname, '../voices', `${filename}.ogg`);
            const response = await axios({
                method: 'get',
                url,
                responseType: 'stream'
            });
            return new Promise(resolve => {
                const stream = createWriteStream(oggPath);
                response.data.pipe(stream);
                stream.on('finish', () => resolve(oggPath));
            });
        } catch (e) {
            console.log('Error while creating an OGG file', e.message);
        }
    }
}

export const ogg = new Ogg_Converter();