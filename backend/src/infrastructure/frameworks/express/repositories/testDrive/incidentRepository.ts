import {MongoIncidentRepository} from "../../../../common/repositories/mongo/testDrive/MongoIncidentRepository";
import client from "../../mongo";

export const incidentRepository = new MongoIncidentRepository(client)