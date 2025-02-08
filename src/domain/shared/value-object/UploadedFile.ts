import { createHash } from 'crypto';

export interface UploadedFileDTO {
    hash: string;
    extension: string;
}

export class UploadedFile {
    constructor(public readonly hash: string, public extension: string) {
    }

    static async getHashFromBlob(file: Blob): Promise<string> {
        const buffer = await file.arrayBuffer();
        const hash = createHash('sha256').update(Buffer.from(buffer)).digest('hex');
        return hash;
    }

    static getExtensionFromBlob(file: Blob): string {
        return file.type.split('/')[1];
    }
}