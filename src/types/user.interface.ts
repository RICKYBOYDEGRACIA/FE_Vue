export interface User {
    firstName: string,
    middleName: string;
    lastName: string;
    age: number;
    location: {
        city: string;
        barangay: string;
    }
    role: string;
}
