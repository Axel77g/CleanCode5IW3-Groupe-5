import {AbstractKnexRepository} from "../AbstractKnexRepository";
import {DriverDocumentsRepository} from "../../../../../application/testDrive/repositories/DriverDocumentsRepository";
import { DriverDocuments } from "../../../../../domain/testDrive/value-object/DriverDocuments";
import { DriverLicenseId } from "../../../../../domain/testDrive/value-object/DriverLicenseId";
import { Result } from "../../../../../shared/Result";

export class KnexDriverDocumentRepository extends AbstractKnexRepository implements DriverDocumentsRepository {
    tableName = 'driver_documents';

    async showDriverDocuments(driverLicenseId: DriverLicenseId): Promise<Result<DriverDocuments[]>> {
        try{
            const driverDocuments = await this.getQuery()
                .where('driver_licence_id', driverLicenseId.getValue())
                .select('*') as any[];

            const mappedDriverDocuments = driverDocuments.map(driverDocument => {
                return new DriverDocuments(
                    driverDocument.id,
                    driverLicenseId,
                    driverDocument.type,
                    driverDocument.description
                )
            })

            return Result.Success<DriverDocuments[]>(mappedDriverDocuments);
        }catch (error){
            const message = error instanceof Error  ? error.message :  "Unknown Error";
            return Result.FailureStr(message);
        }
    }

}