 export class contact{
    Id:number
    Name:string;
    Email:string;
    Phone:string;
    Landline:string;
    Website:string;
    Address:string;
   constructor(name:string,email:string,mobile:string,landline:string,website:string,address:string){
       this.Id = 0;
       this.Name=name;
       this.Email=email;
       this.Phone=mobile;
       this.Landline=landline;
       this.Website=website;
       this.Address=address;
   }
}