var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { login } from "./loginModel.js";
import { Registration } from "./registration.js";
var register = new Registration();
document.getElementById("signUp").addEventListener("click", () => {
    console.log("clicked sign up button");
    signUp();
});
function signUp() {
    return __awaiter(this, void 0, void 0, function* () {
        var name = document.getElementById("Username").value;
        var password = document.getElementById("Userpassword").value;
        var obj = new login(name, password);
        console.log("signupMehtod " + obj);
        var post = yield register.registerUser(obj);
    });
}
