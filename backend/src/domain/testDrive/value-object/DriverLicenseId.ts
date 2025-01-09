import {ApplicationException} from "../../../shared/ApplicationException";

export class DriverLicenseId{

    static errors = {
        NOT_VALID: new ApplicationException("DriverLicenseId.NotValid", "Driver license is not valid")
    }

    private constructor(
        private readonly driverLicenseId: string
    ) {}

    public static create(driverLicenseId: string): DriverLicenseId | ApplicationException
    {
        let driver = new DriverLicenseId(driverLicenseId);
        if(driver.isValid()){
            return driver;
        }
        return DriverLicenseId.errors.NOT_VALID;
    }

    public getValue(): string {
        return this.driverLicenseId;
    }

    public isValid(){
        const regex = /^[A-Z]\d{12}$/;
        return regex.test(this.driverLicenseId);
    }
}