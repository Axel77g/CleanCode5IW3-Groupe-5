import {DriverDocumentsTypes} from "../enums/DriverDocumentsTypes";
import {DriverLicenseId} from "../value-object/DriverLicenseId";

export class DriverDocuments{
    constructor(
        private readonly id: string,
        private readonly driverLicenceId: DriverLicenseId,
        private readonly type : DriverDocumentsTypes,
        private readonly description: string,
    ) {}
}