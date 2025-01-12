import {MongoIncidentRepository} from "../../../../common/repositories/mongo/testDrive/MongoIncidentRepository";
import client from "@infrastructureCore/mongo";

export const incidentRepository = new MongoIncidentRepository(client)