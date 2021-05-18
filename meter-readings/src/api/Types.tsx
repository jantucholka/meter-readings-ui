export type Account = {
    AccountId: number,
    FirstName: string,
    LastName: string
}

export type MeterReading = {
    AccountId: number,
    MeterReadingDateTime: string,
    MeterReadValue: string,
    Id: string
}

export type AddMeterStatusResponse = {
    SuccessfulCount: number,
    FailedCount: number
    Errors: string[]
}