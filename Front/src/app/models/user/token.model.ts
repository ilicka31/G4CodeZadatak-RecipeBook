export class Token {
    token: string;
    userRole: string;
    constructor(t: string, uR: string) {
       this.token=t;
       this.userRole=uR;
    }
}