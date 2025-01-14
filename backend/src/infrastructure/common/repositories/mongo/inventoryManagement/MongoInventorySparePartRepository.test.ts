//write test case in jest
import { Dealer } from "@domain/inventoryManagement/entities/Dealer";
import { Siret } from "@domain/shared/value-object/Siret";
import { DealerMapper } from "@infrastructure/common/entityMappers/DealerMapper";
import { Result } from "@shared/Result";
import { MongoClient } from "mongodb";
import { MongoDealerRepository } from "./MongoDealerRepository";

jest.mock('mongodb');
const mockClient = new MongoClient('mongodb://localhost:27017/');
const mockSession = { startTransaction: jest.fn(), commitTransaction: jest.fn(), abortTransaction: jest.fn(), };
mockClient.startSession = jest.fn().mockReturnValue(mockSession);
describe('MongoInventorySparePartRepository', () => {
    let repo: MongoDealerRepository;

    beforeAll(() => {
        repo = new MongoDealerRepository(mockClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('create instance', () => {
        expect(repo).toBeTruthy();
    });


    describe('delete method', () => {
        const mockSiret = Siret.create('01234567890123');
        if (mockSiret instanceof Error) throw mockSiret;
        test('should delete dealer', async () => {
            const deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
            repo.getCollection = jest.fn().mockReturnValue({ deleteOne });
            const result = await repo.delete(mockSiret); expect(mockSession.startTransaction).toHaveBeenCalled();
            expect(deleteOne).toHaveBeenCalledWith({ siret: mockSiret.getValue() });
            expect(mockSession.commitTransaction).toHaveBeenCalled();
            expect(result).toEqual(Result.SuccessVoid());
        });

        test('should handle delete error', async () => {
            const deleteOne = jest.fn().mockRejectedValue(new Error('delete error'));
            repo.getCollection = jest.fn().mockReturnValue({ deleteOne });
            const result = await repo.delete(mockSiret);
            expect(mockSession.startTransaction).toHaveBeenCalled();
            expect(deleteOne).toHaveBeenCalledWith({ siret: mockSiret.getValue() });
            expect(mockSession.abortTransaction).toHaveBeenCalled();
            expect(result.success).toBeFalsy();
        });
    });

    test('getBySiret method', async () => {
        const mockSiret = Siret.create('01234567890123');
        if (mockSiret instanceof Error) throw mockSiret;
        const dealer = Dealer.fromObject({
            siret: '01234567890123',
            name: "dealer",
            address: {
                street: "street",
                city: "city",
                postalCode: "postalCode",
                country: "fr"
            },
            phoneNumber: "01010101010",
        })
        if (dealer instanceof Error) throw dealer;
        const dealerDocument = DealerMapper.toPersistence(dealer);

        const findOne = jest.fn().mockResolvedValue(dealerDocument);
        repo.getCollection = jest.fn().mockReturnValue({ findOne });
        const result = await repo.getBySiret(mockSiret);
        expect(findOne).toHaveBeenCalledWith({ siret: mockSiret.getValue() });
        expect(result.success).toBeTruthy();
    });

    describe('store method', () => {
        const dealer = Dealer.fromObject({
            siret: '01234567890123',
            name: "dealer",
            address: {
                street: "street",
                city: "city",
                postalCode: "postalCode",
                country: "fr"
            },
            phoneNumber: "01010101010",
        })

        if (dealer instanceof Error) throw dealer;

        test('should store dealer', async () => {
            const updateOne = jest.fn().mockResolvedValue({ upsertedCount: 1 });
            repo.getCollection = jest.fn().mockReturnValue({ updateOne });
            const result = await repo.store(dealer);
            expect(mockSession.startTransaction).toHaveBeenCalled();
            expect(updateOne).toHaveBeenCalledWith({ siret: dealer.siret.getValue() }, { $set: DealerMapper.toPersistence(dealer) }, { upsert: true });
            expect(mockSession.commitTransaction).toHaveBeenCalled();
            expect(result).toEqual(Result.SuccessVoid());
        });

        test('should handle store error', async () => {
            const updateOne = jest.fn().mockRejectedValue(new Error('store error'));
            repo.getCollection = jest.fn().mockReturnValue({ updateOne });
            const result = await repo.store(dealer);
            expect(mockSession.startTransaction).toHaveBeenCalled();
            expect(updateOne).toHaveBeenCalledWith({ siret: dealer.siret.getValue() }, { $set: DealerMapper.toPersistence(dealer) }, { upsert: true });
            expect(mockSession.abortTransaction).toHaveBeenCalled();
            expect(result.success).toBeFalsy();
        });

    });
});