import Driver from "../models/driver.model.ts"

interface createDriverProps {
    firstname: string;
    lastname?: string;
    email: string;
    password: string;
    color: string;
    plate: string;
    capacity: number;
    vehicleType: string;
}

export async function createDriver({
    firstname, lastname, email, password,
    color, plate, capacity, vehicleType
}: createDriverProps) {

    const driver = Driver.create({
        fullname: {
            firstname: firstname,
            lastname: lastname,
        },
        email: email,
        password: password,
        vehicle: {
            color: color,
            plate: plate,
            capacity: capacity,
            vehicleType: vehicleType,
        }
    })

    return driver
}
