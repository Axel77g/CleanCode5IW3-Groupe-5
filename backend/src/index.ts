import {createRegisterDriverUseCase} from "./application/testDrive/usecases/driver/RegisterDriverUseCase";
import {MongoClient} from "mongodb";
import {
    MongoTestDriveEventRepository
} from "./infrastructure/common/repositories/mongo/testDrive/MongoTestDriveEventRepository";
import {EventObserver} from "./infrastructure/common/observers/EventObserver";
import {DriverLicenseId} from "./domain/testDrive/value-object/DriverLicenseId";
import {DriversProjection} from "./application/testDrive/projections/DriversProjection";
import {MongoDriverRepository} from "./infrastructure/common/repositories/mongo/testDrive/MongoDriverRepository";
import {TestsDrivesProjection} from "./application/testDrive/projections/TestsDrivesProjection";
import {MongoTestDriveRepository} from "./infrastructure/common/repositories/mongo/testDrive/MongoTestDriveRepository";
import {createRegisterIncidentUseCase} from "./application/testDrive/usecases/incident/RegisterIncidentUseCase";
import {IncidentType} from "./domain/testDrive/enums/IncidentType";
import {createRegisterTestDriveUseCase} from "./application/testDrive/usecases/testDrive/RegisterTestDriveUseCase";
import {Period} from "./domain/testDrive/value-object/Period";
import {IncidentsProjection} from "./application/testDrive/projections/IncidentsProjection";
import {MongoIncidentRepository} from "./infrastructure/common/repositories/mongo/testDrive/MongoIncidentRepository";
import {VehicleImmatriculation} from "@domain/maintenance/value-object/VehicleImmatriculation";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, {
    auth:{
        username:"root",
        password:"root"
    }
});

async function main(){
    await client.connect()

    const eventObserver = new EventObserver()

    const driverRepository = new MongoDriverRepository(client)
    new DriversProjection(driverRepository)
    const testDriveRepository = new MongoTestDriveRepository(client)
    new TestsDrivesProjection(testDriveRepository)

    const incidentRepository = new MongoIncidentRepository(client)
    new IncidentsProjection(incidentRepository)

    const testDriveEventRepository = new MongoTestDriveEventRepository(client,eventObserver)
    const rDriverUseCase = createRegisterDriverUseCase(testDriveEventRepository, driverRepository)

    const driverLicenseId = DriverLicenseId.create("124536323125")
    if(driverLicenseId instanceof Error) return console.error(driverLicenseId)

    const result = await rDriverUseCase({
        driverLicenseId,
        birthDate: new Date(),
        driverLicensedAt : new Date(),
        firstName:"John",
        lastName:"Doe",
        email:"jogn@exemple.com"
    })

    if(!result.success) return;

    const rIncidentUseCase = createRegisterIncidentUseCase(testDriveEventRepository, driverRepository)
    const resultRegisterIncident = await rIncidentUseCase({
        driverLicenseId,
        description:"Le pello a fait un accident",
        date: new Date(),
        type: IncidentType.ACCIDENT
    })

    if(!resultRegisterIncident.success) return console.error(resultRegisterIncident)

    const immatriculation = VehicleImmatriculation.create("AA-123-AA")
    if(immatriculation instanceof Error) return console.error(immatriculation)

    const period = Period.create(new Date(), new Date())
    if(period instanceof Error) return period

    const rTestDriveUseCase = createRegisterTestDriveUseCase(testDriveEventRepository, driverRepository, testDriveRepository)
    const resultRegisterTestDrive = await rTestDriveUseCase({
        driverLicenseId,
        vehicleImmatriculation: immatriculation,
        period,
    })

    if(!resultRegisterTestDrive.success) return console.error(resultRegisterTestDrive)


}


main()