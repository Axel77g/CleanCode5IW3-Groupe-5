import {registerDriverUseCase} from "./application/testDrive/usecases/driver/RegisterDriverUseCase";
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
import {DriverCreatedEvent} from "./domain/testDrive/Events/DriverCreatedEvent";
import {DriverUpdatedEvent} from "./domain/testDrive/Events/DriverUpdatedEvent";
import {RegisterTestDriveEvent} from "./domain/testDrive/Events/RegisterTestDriveEvent";
import {registerIncidentUseCase} from "./application/testDrive/usecases/incident/RegisterIncidentUseCase";
import {IncidentType} from "./domain/testDrive/enums/IncidentType";
import {registerTestDriveUseCase} from "./application/testDrive/usecases/testDrive/RegisterTestDriveUseCase";
import {VehicleImmatriculation} from "./domain/shared/value-object/VehicleImmatriculation";
import {Period} from "./domain/testDrive/value-object/Period";
import {IncidentsProjection} from "./application/testDrive/projections/IncidentsProjection";
import {MongoIncidentRepository} from "./infrastructure/common/repositories/mongo/testDrive/MongoIncidentRepository";
import {RegisterIncidentEvent} from "./domain/testDrive/Events/RegisterIncidentEvent";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, {
    auth:{
        username:"root",
        password:"root"
    }
});

async function main(){
    console.log("Start")
    await client.connect()

    const eventObserver = new EventObserver()

    const driverRepository = new MongoDriverRepository(client)
    const driversProjection = new DriversProjection(driverRepository)
    eventObserver.subscribe(DriverCreatedEvent.type, driversProjection.receive.bind(driversProjection))
    eventObserver.subscribe(DriverUpdatedEvent.type, driversProjection.receive.bind(driversProjection))

    const testDriveRepository = new MongoTestDriveRepository(client)
    const testDriveProjection = new TestsDrivesProjection(testDriveRepository)
    eventObserver.subscribe(RegisterTestDriveEvent.type, testDriveProjection.receive.bind(testDriveProjection))

    const incidentRepository = new MongoIncidentRepository(client)
    const incidentsProjection = new IncidentsProjection(incidentRepository)
    eventObserver.subscribe(RegisterIncidentEvent.type, incidentsProjection.receive.bind(incidentsProjection))

    const testDriveEventRepository = new MongoTestDriveEventRepository(client,eventObserver)
    const rDriverUseCase = registerDriverUseCase(testDriveEventRepository)

    const driverLicenseId = DriverLicenseId.create("124536323125")
    if(driverLicenseId instanceof Error) return console.error(driverLicenseId)

    const result = await rDriverUseCase({
        driverLicenseId,
        driverLicensedAt : new Date(),
        firstName:"John",
        lastName:"Doe",
        email:"jogn@exemple.com"
    })

    console.log(result)
    if(!result.success) return;




    const rIncidentUseCase = registerIncidentUseCase(testDriveEventRepository, driverRepository)
    const resultRegisterIncident = await rIncidentUseCase({
        driverLicenseId,
        description:"Le pello a fait un accident",
        date: new Date(),
        type: IncidentType.ACCIDENT
    })

    if(!resultRegisterIncident.success) return console.error(resultRegisterIncident)
    console.log(resultRegisterIncident)

    const immatriculation = VehicleImmatriculation.create("AA-123-AA")
    if(immatriculation instanceof Error) return console.error(immatriculation)

    const rTestDriveUseCase = registerTestDriveUseCase(testDriveEventRepository, driverRepository)
    const resultRegisterTestDrive = await rTestDriveUseCase({
        driverLicenseId,
        vehicleImmatriculation: immatriculation,
        period: new Period(new Date(), new Date())
    })

    if(!resultRegisterTestDrive.success) return console.error(resultRegisterTestDrive)
    console.log(resultRegisterTestDrive)

    console.log("End")

}


main()