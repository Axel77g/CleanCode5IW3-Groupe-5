import {UseCaseImplementation} from "@infrastructureCore/useCaseImplementation/UseCaseImplementation";
import {putDriverDocumentsRequest} from "@infrastructureCore/requests/testDrive/putDriverDocumentsRequest";
import {
    createPutDriverDocumentsUseCase,
    PutDriverDocumentsUseCase
} from "@application/testDrive/usecases/driver/PutDriverDocumentsUseCase";
import {testDriveEventRepository} from "@infrastructureCore/repositories/testDrive/testDriveEventRepository";
import {driverRepository} from "@infrastructureCore/repositories/testDrive/driverRepository";
import {fileUploadService} from "@infrastructureCore/services/fileUploadService";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {ApplicationException} from "@shared/ApplicationException";

export const putDriverDocumentsUseCase : UseCaseImplementation<typeof putDriverDocumentsRequest, PutDriverDocumentsUseCase> = (input, files : File[]) => {
    const driverLicenseId = DriverLicenseId.create(input.driverLicenseId);
    if(driverLicenseId instanceof ApplicationException) return Promise.reject(driverLicenseId);
    const useCase = createPutDriverDocumentsUseCase(testDriveEventRepository,driverRepository,fileUploadService);
    return useCase({
        ...input,
        files,
        driverLicenseId
    });
}