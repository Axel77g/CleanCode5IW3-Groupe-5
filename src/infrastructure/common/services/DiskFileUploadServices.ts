import {FileUploadServices} from "@application/testDrive/services/FileUploadService";
import {Result, VoidResult} from "@shared/Result";
import {UploadedFile} from "@domain/shared/value-object/UploadedFile";
import path from "node:path";
import fs from "fs";

const UPLOADS_DIR = path.join(__dirname, "..", "..", "..", "..", "uploads");

export class DiskFileUploadServices implements FileUploadServices {
    /**
     * Upload a file blog to the disk according the hash and extension of the file
     * @param file
     * @param blob
     * @return the path of the file on disk
     */
    async uploadFile(file: UploadedFile, blob: File): Promise<Result<string>> {
        try {
            fs.mkdirSync(UPLOADS_DIR, { recursive: true });
            const filePath = path.join(UPLOADS_DIR, `${file.hash}.${file.extension}`);
             fs.writeFileSync(filePath, Buffer.from(await blob.arrayBuffer()));
            return Result.Success(filePath);
        } catch (error) {
            console.error(error);
            return Result.FailureStr("Cannot upload file on disk");
        }
    }

    /**
     * Find a file by its representation
     * @param file
     */
    async findFile(file: UploadedFile): Promise<Result<File>> {
        const extension = file.extension;
        const filePath = path.join(UPLOADS_DIR, `${file.hash}.${extension}`);
        if (fs.existsSync(filePath)){
            const buffer = fs.readFileSync(filePath);
            const blob = new File([buffer], file.hash);
            return Result.Success(blob);
        }
        return Result.FailureStr('File not found on disk');
    }

    /**
     * Delete a file by its representation
     * @param file
     */
    async deleteFile(file: UploadedFile): Promise<VoidResult> {
        const extension = file.extension;
        const filePath = path.join(UPLOADS_DIR, `${file.hash}.${extension}`);
        if (await this.existsFile(file)) {

            try{
                fs.unlinkSync(filePath
                );
            }catch (e){
                console.error(e);
                return Result.FailureStr('Cannot delete file');
            }
            return Result.SuccessVoid();
        }
        return Result.SuccessVoid();
    }

    async existsFile(file: UploadedFile): Promise<boolean> {
        const extension = file.extension;
        const filePath = path.join(UPLOADS_DIR, `${file.hash}.${extension}`);
        return fs.existsSync(filePath);
    }

}