export class User {
    email: string;
    userId: number;
    role: string;
    name: string;
    constructor(id: number, email: string, role:string,  fullname:string) {
        this.userId= id;
        this.email = email;
        this.role = role;
        this.name = fullname;
    }
}