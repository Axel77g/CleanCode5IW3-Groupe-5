export class DriverLicenseId{
    constructor(
        private readonly driverLicenceId: string
    ) {}

    public getDriverLicenseId(): string {
        return this.driverLicenceId;
    }

    public isValid(){
        const regex = new RegExp("^[A-Z]{1,2}\\d{1,6}[A-Z]{1,3}$");
        return regex.test(this.driverLicenceId);
    }
}