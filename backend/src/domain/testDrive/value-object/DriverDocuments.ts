import {DriverDocumentsTypes} from "../enums/DriverDocumentsTypes";

export class DriverDocuments{
    constructor(
        public readonly name: string,
        public readonly type : DriverDocumentsTypes,
        public readonly description: string,
    ) {}
}