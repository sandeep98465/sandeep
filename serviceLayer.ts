import { login } from "./loginModel.js";
import { contact} from "./model.js";
import { fetchDataBase } from "./dataModel.js";
var obj=new fetchDataBase();
export class services{
async login(object:login){
   await obj.postUserCredentialsIntoDb(object);
}
async addContact(contact :contact){
       await obj.addContact(contact);
}
async getContacts(){
  return await obj.getContacts();
}
 async updateContact(id:any, contactObj:contact){
  console.log(id +" update "+contactObj.Name);
  
    //return 
    await obj.updateContact(id,contactObj)
}
async deleteContact(id:any){
  await obj.deleteContact(id);
}

}