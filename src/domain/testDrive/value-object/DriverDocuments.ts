import {DriverDocumentsTypes} from "../enums/DriverDocumentsTypes";
import {UploadedFile, UploadedFileDTO} from "@domain/shared/value-object/UploadedFile";

export interface DriverDocumentsDTO extends UploadedFileDTO {
    type: DriverDocumentsTypes;
    description: string;
    name: string;
}

export class DriverDocuments extends UploadedFile{
    private constructor(
        public readonly name: string,
        public readonly type : DriverDocumentsTypes,
        public readonly description: string,
        public readonly hash: string,
        public readonly extension: string,
    ) {
        super(hash, extension);
    }

    static create(object:{
        name: string,
        type: DriverDocumentsTypes,
        description: string,
        hash: string,
        extension: string
    }){
        return new DriverDocuments(
            object.name,
            object.type,
            object.description,
            object.hash,
            object.extension
        );
    }

    static fromObject(object : DriverDocumentsDTO){
        return DriverDocuments.create(object)
    }
}