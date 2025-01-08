import {DriverDocumentsTypes} from "../enums/DriverDocumentsTypes";
import {DriverLicenseId} from "./DriverLicenseId";

export class DriverDocuments{
    constructor(
        public readonly name: string,
        public readonly type : DriverDocumentsTypes,
        public readonly description: string,
    ) {}
}