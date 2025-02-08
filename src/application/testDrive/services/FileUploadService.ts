import {Result, VoidResult} from "@shared/Result";
import {UploadedFile} from "@domain/shared/value-object/UploadedFile";

export interface FileUploadServices {
    uploadFile(file: UploadedFile, blob: File): Promise<Result<string>>

    findFile(file: UploadedFile): Promise<Result<File>>

    deleteFile(file: UploadedFile): Promise<VoidResult>

    existsFile(file: UploadedFile): Promise<boolean>
}