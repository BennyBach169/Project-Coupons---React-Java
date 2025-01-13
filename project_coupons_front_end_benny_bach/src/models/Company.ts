import { pseudoRandomBytes } from "crypto";
import { Coupon } from "./Coupon";



export class Company {
    id: number;
    name?: string;
    email?:string;
    password?:string 

    constructor(id: number, name?: string, email?: string , password?:string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
