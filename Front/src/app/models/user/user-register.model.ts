export class Register {
    email: string;
    password: string;
    role: number;
    name: string;
    constructor(email: string, password:string, role:number,  fullname:string) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.name = fullname;
    }
}