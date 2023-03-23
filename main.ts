import { fetchDataBase } from './dataModel.js';
import {contact} from './model.js'
import {login} from './loginModel.js'
import { token } from './dataModel.js';
import {services} from './serviceLayer.js'
var obj=new fetchDataBase();
var service=new services();
var id:any,tempId:any,temp:any;
var initial=true,up=true;
var previousId=0;
 //loging in user
 var loginData:HTMLFormElement=<HTMLFormElement>document.getElementById("loginForm");
 (document.getElementById("login") as HTMLElement).addEventListener("click",()=>{
     if(token==null)
    loginData.style.display='block';
 });
// }
 ( document.getElementById("loginButton") as HTMLButtonElement).addEventListener("click",async ()=>{
    form=<any>document.getElementById("loginForm");
    let Username=((<any>document.getElementById("Username")).value);
    let password=((<any>document.getElementById("password")).value);
    var loginObj=new login(Username,password);
    let data =await service.login(loginObj);
    form.style.display='none';
    if(token!=null){
        await getContacts(); 
    } 
    else{
        alert("Invalid User");
    }
})
async function getContacts(){
   //var table=document.getElementById("table-body");
   var res= await service.getContacts();
   res.value.forEach(element => {
       insertRowIntoTable(element);
    });
  res=res.value;
  if(up){
  if(initial)
  {
    display(res[0].id);
    id=res[0].id;
  }
  else
  {
    id=res[res.length-1].id
    display(id);
  }
}
 previousId=id;
}
 //adding row into table
 function insertRowIntoTable(val){
   var row=document.createElement('tr');
   row.innerHTML=`<tr  style="font-size:20px"  id=${val.id}>
                       <td>
                           <p class="rName">${val.name}</p>
                           <p>${val.email}</p>
                           <p>${val.phone}</p>
                       </td>
                   </tr>`
   row.setAttribute('id',`${val.id}`)
   row.addEventListener('click',async(e:Event)=>{
   id=(e.currentTarget as any).id;
   document.getElementById(`${previousId}`)?.classList.remove("selectedRowBackground");
   document.getElementById(`${id}`)?.classList.add("selectedRowBackground");
   await  display(id);
   previousId=id;
   })
   table.appendChild(row);
}
//adding New Contact
    var formData:HTMLFormElement=<HTMLFormElement>document.getElementById("addForm");
    
 ( document.getElementById("book") as HTMLElement).addEventListener('click',()=>{
     if(token!=null)
     {
        formData.style.display='block';  
        (<HTMLFormElement>document.getElementById("formData")).reset();
        (document.getElementById("card") as HTMLElement).style.display='none';

        document.getElementById("cancel")?.addEventListener('click',()=>{
            formData.style.display='none';
            (document.getElementById("card") as HTMLElement).style.display='block';
            (<HTMLFormElement>document.getElementById("formData")).reset();
        })

        document.getElementById("updateButton").style.display='none';
        document.getElementById("addButton").style.display='block';
        (<HTMLFormElement>document.getElementById("formData")).reset();
    }
    else{
        loginData.style.display='block';
    }
})

var table:HTMLTableElement=<HTMLTableElement>document.getElementById("table-body");
var i:number=0,previousRow:any=-1,form:any,isFormValid:any;

var name1:string,email:string,mobile:string,landline:string,website:string,address:string;

// inserting new contact into book
   ( document.getElementById("addButton") as HTMLButtonElement).addEventListener("click",async ()=>{
      
    form=<any>document.getElementById("addForm");
    name1=((<any>document.getElementById("name")).value);
   
    email=((<any>document.getElementById("email")).value);
    mobile=<string>((<any>document.getElementById("mobile")).value);
    landline=((<any>document.getElementById("landline")).value);
    website=((<any>document.getElementById("website")).value);
    address=((<any>document.getElementById("address")).value);
    isFormValid=(validateFields(name1,email,mobile));
    if(isFormValid){
    var contactobj=new contact(name1,email,mobile,landline,website,address);
    let data =await service.addContact(contactobj)
    table.innerHTML="";
    initial=false;
    await getContacts();
    form.style.display='none';

    }         

})
var data=''
//display card details
 async  function display(id:number){
     console.log(id+" in dispaly method");
     document.getElementById(`${previousId}`)?.classList.remove("selectedRowBackground");
     document.getElementById(`${id}`)?.classList.add("selectedRowBackground");
    //  previousId=id;
    await obj.getContact(id).then(data=>{
        data=data.value;
        temp=data;
        document.getElementById("cardName").innerHTML=data.name
        document.getElementById("cardEmail").innerHTML=data.email
        document.getElementById("cardMobile").innerHTML=data.phone
        document.getElementById("cardLandline").innerHTML=data.landline
        document.getElementById("cardWebsite").innerHTML=data.website
        document.getElementById("cardAddress").innerHTML=data.address
     })
    document.getElementById("card").style.display='block';
    formData.style.display='none';
    previousId=id;
};

//deleting a contact  
document.getElementById("deleteButton").addEventListener('click',async function(){
    const response=confirm("Do you want to delete contact!!")
    if(response){
     await service.deleteContact(id)
        table.innerHTML="";
        getContacts();
        initial=true;
        document.getElementById('card').style.display='none';  
    }   
})
//editing the contact
document.getElementById('editButton').addEventListener('click',async function(){
  // let data=await obj.getContact(id);
//    console.log(data);
   let data=temp;
   console.log("temp in edit "+temp);
   console.log(data);
   
   
        (<any>document.getElementById("name")).value=data.name;
        (<any>document.getElementById("email")).value=data.email;
        (<any>document.getElementById("mobile")).value=data.phone;
        (<any>document.getElementById("landline")).value=data.landline;
        (<any>document.getElementById("website")).value=data.website;
        (<any>document.getElementById("address")).value=data.address;
        document.getElementById("updateButton").style.display='block';
        document.getElementById('addButton').style.display='none'; 
        document.getElementById('card').style.display='none';
        // formData.style.display='block';
        console.log((<any>document.getElementById("name")).value);
        
        formData.style.display='block';
        document.getElementById("cancel").addEventListener('click',()=>{
        formData.style.display='none';
        document.getElementById("card").style.display='block';
        (<HTMLFormElement>document.getElementById("formData")).reset();
        });  
})
//update existing contact:
  document.getElementById("updateButton").addEventListener('click',async function(){
    name1=((<any>document.getElementById("name")).value);
    email=((<any>document.getElementById("email")).value);
    mobile=<string>((<any>document.getElementById("mobile")).value);
    landline=((<any>document.getElementById("landline")).value);
    website=((<any>document.getElementById("website")).value);
    address=((<any>document.getElementById("address")).value);
    isFormValid=(validateFields(name1,email,mobile));
    if(isFormValid)
    {
        var contactobj=new contact(name1,email,mobile,landline,website,address);
        await service.updateContact(id,contactobj);
        console.log("after update method");
        
        table.innerHTML="";
        up=false;
        tempId=id;
        await getContacts();
        id=tempId;
        await display(id);
        up=true;
        console.log("update" +id);
        
    formData.style.display='none';
    document.getElementById("updateButton").style.display='none'
    document.getElementById("addButton").style.display='block'
    
    document.getElementById('card').style.display='block';
    }
})
//validating the form:
var res:any=1;
var regex:any=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function validateFields(name:string,email:string,mobile:string):boolean{
    res=1;
    
    if(name1==""||email==''){
        alert("fill form");
        res&=0;
        console.log("ne"+res)
    }
        else if(!regex.test(email)){
            // alert("please enter valid email")
            validateEmail();
            res&=0;
        }
        else if(isNaN(<number><any>mobile)||mobile.length!=10){
            validateMobile()
            res&=0;
                }
        return res;
}
var emailValue= <any>document.getElementById("email");
var mobileValue= <any>document.getElementById("mobile");
function validateEmail()
{
    if(!regex.test(emailValue.value))
    document.getElementById("reqEmail").innerHTML="not valid";
    else 
    document.getElementById("reqEmail").innerHTML="*";
}
function validateMobile()
{
    if(!(mobileValue.value).length){
        document.getElementById("reqMobile").innerHTML="*";
    }
    if(isNaN(<number>mobileValue.value)||((<string>(mobileValue.value)).length!=10))
    document.getElementById("reqMobile").innerHTML="not valid";
    else 
    document.getElementById("reqMobile").innerHTML="*";
}
