import { promises as fs } from 'fs';

export async function removeFiles(path) {
    try {
        await fs.unlink(path);
    } catch (e) {
        console.log('Error while removing file', e.message);
    }
}