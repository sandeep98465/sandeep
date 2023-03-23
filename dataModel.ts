 
 import {contact} from './model.js'
 import { login } from "./loginModel.js";
 import { services } from './serviceLayer.js';
 export var token;

 export class fetchDataBase{
  
    async postUserCredentialsIntoDb(obj:login){
        console.log(obj);
        let postApi=await fetch("https://localhost:7257/api/Login",{
            method:"POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json"
            }
        }) 
            await postApi.json().then(data=>{
          token=data.token;
        //   return token;
         console.log(token);
      }
          
      )     
    }
  async  getContacts(){
 console.log("another "+token)
     let aa= await fetch("https://localhost:7257/api/AddressBook",{
       headers:{
           "Authorization":"Bearer "+token
       }
     }).then((data)=>data.json()
     )
    return aa;
 }
 async addContact(obj:contact){
     console.log("In fetch "+ obj);
     
    let postApi=await fetch("https://localhost:7257/api/AddressBook",{
        method:"POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-type": "application/json"
        }
    })  
    console.log(postApi);
    
}
// var data1=''
 async getContact(id:any){
     console.log("fetching displayCOnaatctDetails");
     
     let  data1 =await fetch(`https://localhost:7257/api/AddressBook/${id}`).then((data)=>  data.json()
    //  ).then(data=>console.log(data.value.name)
     ).catch(err=>console.log(err));
    // console.log(data1.value.name);
     
return data1;
       
}
async updateContact(id:any,obj:contact){
    console.log("update in data class "+obj);
    
      let update=await fetch(`https://localhost:7257/api/AddressBook/${id}`,{
          method:"PUT",
          body: JSON.stringify(obj),
                  headers: {
                      "Content-type": "application/json"
                  } 
      }).then((data)=>data.json()).then(data=>console.log(data)
      ).catch((err)=>console.log(err))
  }
async deleteContact(id:any){
    let del=await fetch(`https://localhost:7257/api/AddressBook/${id}`,{
        method:"DELETE",
        headers:{
            "Content-type":"application/json"
        },
        body:null
    }).catch(err=>console.log(err)
    )
}
    
 }
