export class Maintenance {
    constructor(
        public readonly id: MaintenanceId,
        public readonly vehicleId: VehicleId,
        public readonly description: string,
        public readonly date: Date,
        public readonly cost: number,
    ) { }
}