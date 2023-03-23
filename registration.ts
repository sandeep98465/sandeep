import { login } from "./loginModel.js";

export class Registration{
    async registerUser(obj:login){
        console.log("in fetch "+obj);
        
        let postApi=await fetch("https://localhost:7257/api/Registration",{
            method:"POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json"
            }
        }) 
    }
}