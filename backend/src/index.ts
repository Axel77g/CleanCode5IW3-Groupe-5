import {registerDriverUseCase} from "./application/testDrive/usecases/driver/RegisterDriverUseCase";
import {MongoClient} from "mongodb";
import {
    MongoTestDriveEventRepository
} from "./infrastructure/common/repositories/mongo/testDrive/MongoTestDriveEventRepository";
import {EventObserver} from "./infrastructure/common/observers/EventObserver";
import {DriverLicenseId} from "./domain/testDrive/value-object/DriverLicenseId";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function main(){
    client.connect()
    const eventObserver = new EventObserver()
    const repository = new MongoTestDriveEventRepository(client,eventObserver)
    const usecase = registerDriverUseCase(repository)

    await usecase({
        driverLicenceId: new DriverLicenseId("124536323125"),
        driverLicensedAt : new Date(),
        firstName:"John",
        lastName:"Doe",
        email:"jogn@exemple.com"
    })
}


main()