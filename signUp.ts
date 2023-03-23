import { login } from "./loginModel.js";
import { Registration } from "./registration.js";
var register=new Registration();
document.getElementById("signUp").addEventListener("click",()=>{
    console.log("clicked sign up button");
    
    signUp();
})
 async function signUp(){
    var name=(document.getElementById("Username") as any).value;
    var password=(document.getElementById("Userpassword") as any).value;
    var obj=new login(name,password);
    console.log("signupMehtod "+obj);
    
    var post=await register.registerUser(obj);
}