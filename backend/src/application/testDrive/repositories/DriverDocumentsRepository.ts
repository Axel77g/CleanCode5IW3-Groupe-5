import {IRepository} from "../../../shared/IRepository";
import {Result} from "../../../shared/Result";
import {DriverDocuments} from "../../../domain/testDrive/value-object/DriverDocuments";
import {DriverLicenseId} from "../../../domain/testDrive/value-object/DriverLicenseId";

export interface DriverDocumentsRepository extends IRepository{
    showDriverDocuments(driverLicenseId: DriverLicenseId): Promise<Result<DriverDocuments[]>>;
}