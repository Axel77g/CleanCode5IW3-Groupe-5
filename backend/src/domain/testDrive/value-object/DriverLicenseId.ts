import {ApplicationException} from "@shared/ApplicationException";

export class DriverLicenseId{

    static errors = {
        NOT_VALID: new ApplicationException("DriverLicenseId.NotValid", "Driver license is not valid")
    }

    private constructor(
        private readonly value: string
    ) {}

    public static create(driverLicenseId: string): DriverLicenseId | ApplicationException
    {
        const driver = new DriverLicenseId(driverLicenseId);
        if(driver.isValid()){
            return driver;
        }
        return DriverLicenseId.errors.NOT_VALID;
    }

    public getValue(): string {
        return this.value;
    }

    public isValid(){
        return true;
        const regex = /^[A-Z]\d{12}$/;
        return regex.test(this.value);
    }
}