import {NotValidDriverLicense} from "../Errors/NotValidDriverLicense";

export class DriverLicenseId{
    private constructor(
        private readonly driverLicenseId: string
    ) {}

    public static create(driverLicenseId: string): DriverLicenseId | NotValidDriverLicense
    {
        let driver = new DriverLicenseId(driverLicenseId);
        if(driver.isValid()){
            return driver;
        }
        return new NotValidDriverLicense();
    }

    public getValue(): string {
        return this.driverLicenseId;
    }

    public isValid(){
        return true
        const regex = new RegExp("^[A-Z]{1,2}\\d{1,6}[A-Z]{1,3}$");
        return regex.test(this.driverLicenseId);
    }
}