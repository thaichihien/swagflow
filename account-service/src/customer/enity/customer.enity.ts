export class Customer{
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob?: Date;
    phone?: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}