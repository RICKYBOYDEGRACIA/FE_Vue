export interface UserLogin {
    userName: string;
    password: string;
}


export interface RegisterUser {
    firstName: string,
    middleName: string;
    lastName: string;
    age: number;
    location: {
        city: string;
        barangay: string;
    }
    role: string;
    email: string,
    password: string,
}
