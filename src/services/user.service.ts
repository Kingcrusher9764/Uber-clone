import User from "../models/user.model.ts"

interface createUserProps {
    firstname: string;
    lastname?: string;
    email: string;
    password: string;
}

export async function createUser({
    firstname, lastname, email, password,
}: createUserProps) {

    const newUser = User.create({
        fullname: {
            firstname: firstname,
            lastname: lastname,
        },
        email: email,
        password: password,
    })

    return newUser
}
