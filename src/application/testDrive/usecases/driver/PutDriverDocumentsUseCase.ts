import {IInputUseCase, IUseCase} from "@shared/IUseCase";
import {DriverLicenseId} from "@domain/testDrive/value-object/DriverLicenseId";
import {Result} from "@shared/Result";
import {EventRepository} from "@application/shared/repositories/EventRepository";
import {DriverRepository} from "@application/testDrive/repositories/DriverRepository";
import {DriverDocumentsTypes} from "@domain/testDrive/enums/DriverDocumentsTypes";
import {NotFoundEntityException} from "@shared/ApplicationException";
import {FileUploadServices} from "@application/testDrive/services/FileUploadService";
import {UploadedFile} from "@domain/shared/value-object/UploadedFile";
import {DriverDocuments} from "@domain/testDrive/value-object/DriverDocuments";

interface PutDriverDocumentsInput extends IInputUseCase {
    driverLicenseId: DriverLicenseId;
    documents: {
        name: string;
        type: DriverDocumentsTypes;
        description: string;
        hash ?: string;
        extension ?: string;
    }[]
    files: File[]
}

export type PutDriverDocumentsUseCase =  IUseCase<PutDriverDocumentsInput, Result>

const putDriverDocumentsErrors = {
    DRIVER_NOT_FOUND: NotFoundEntityException.create("Driver not found")
}

export const createPutDriverDocumentsUseCase = (_eventRepository: EventRepository, _driverRepository: DriverRepository, _fileUploadService: FileUploadServices): PutDriverDocumentsUseCase => {
    return async (input: PutDriverDocumentsInput) => {
        //1 check if driver exist
        const driverResponse=  await _driverRepository.getByLicenseId(input.driverLicenseId)
        if(!driverResponse.success) return driverResponse
        if(driverResponse.empty) return Result.Failure(putDriverDocumentsErrors.DRIVER_NOT_FOUND)

        let updatedDriver = driverResponse.value

        // 2 compare the documents array with the existing documents
        const existingDocuments = driverResponse.value.documents
        const documentsToDelete = existingDocuments.filter(doc => {
            return !input.documents.some(inputDoc => inputDoc.hash === doc.hash && inputDoc.name === doc.name)
        })

        // 3 delete those that are not in the array
        const deleteJobs = documentsToDelete.map(doc => _fileUploadService.deleteFile(doc))
        const jobsResponses = await Promise.all(deleteJobs)

        if(jobsResponses.some(r => !r.success)) return Result.FailureStr("Some documents cannot be deleted")
        updatedDriver = documentsToDelete.reduce((acc, doc) => acc.removeDocument(doc), updatedDriver) // remove the documents from the driver entity

        // 4 find the new files to upload => the document to upload are those have no hash and extension
        const newDocuments = input.documents.filter(doc => !doc.hash && !doc.extension)
        if(newDocuments.length !== input.files.length) return Result.FailureStr("The number of files to upload is not the same as the number of new documents")

        // 5 create DriverDocument[] with the new files and the existing files
        let index = 0
        for(const file of input.files){
            const fileHash = await UploadedFile.getHashFromBlob(file)
            const driverDocument = DriverDocuments.create({
                name: newDocuments[index].name,
                type: newDocuments[index].type,
                description: newDocuments[index].description,
                hash: fileHash,
                extension: UploadedFile.getExtensionFromBlob(file)
            })
            const response = await _fileUploadService.uploadFile(driverDocument, file)
            if(!response.success) return response
            updatedDriver = updatedDriver.addDocument(driverDocument)
            index++
        }

        // 6 store the new driver documents
        const response = await _eventRepository.storeEvent(updatedDriver.putDocumentsEvent())
        if(!response.success) return response
        return Result.Success("done")
    }
}
