var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchDataBase } from './dataModel.js';
import { contact } from './model.js';
import { login } from './loginModel.js';
import { token } from './dataModel.js';
import { services } from './serviceLayer.js';
var obj = new fetchDataBase();
var service = new services();
var id, tempId, temp;
var initial = true, up = true;
var previousId = 0;
//loging in user
var loginData = document.getElementById("loginForm");
document.getElementById("login").addEventListener("click", () => {
    if (token == null)
        loginData.style.display = 'block';
});
// }
document.getElementById("loginButton").addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    form = document.getElementById("loginForm");
    let Username = (document.getElementById("Username").value);
    let password = (document.getElementById("password").value);
    var loginObj = new login(Username, password);
    let data = yield service.login(loginObj);
    form.style.display = 'none';
    if (token != null) {
        yield getContacts();
    }
    else {
        alert("Invalid User");
    }
}));
function getContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        //var table=document.getElementById("table-body");
        var res = yield service.getContacts();
        res.value.forEach(element => {
            insertRowIntoTable(element);
        });
        res = res.value;
        if (up) {
            if (initial) {
                display(res[0].id);
                id = res[0].id;
            }
            else {
                id = res[res.length - 1].id;
                display(id);
            }
        }
        previousId = id;
    });
}
//adding row into table
function insertRowIntoTable(val) {
    var row = document.createElement('tr');
    row.innerHTML = `<tr  style="font-size:20px"  id=${val.id}>
                       <td>
                           <p class="rName">${val.name}</p>
                           <p>${val.email}</p>
                           <p>${val.phone}</p>
                       </td>
                   </tr>`;
    row.setAttribute('id', `${val.id}`);
    row.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        id = e.currentTarget.id;
        (_a = document.getElementById(`${previousId}`)) === null || _a === void 0 ? void 0 : _a.classList.remove("selectedRowBackground");
        (_b = document.getElementById(`${id}`)) === null || _b === void 0 ? void 0 : _b.classList.add("selectedRowBackground");
        yield display(id);
        previousId = id;
    }));
    table.appendChild(row);
}
//adding New Contact
var formData = document.getElementById("addForm");
document.getElementById("book").addEventListener('click', () => {
    var _a;
    if (token != null) {
        formData.style.display = 'block';
        document.getElementById("formData").reset();
        document.getElementById("card").style.display = 'none';
        (_a = document.getElementById("cancel")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            formData.style.display = 'none';
            document.getElementById("card").style.display = 'block';
            document.getElementById("formData").reset();
        });
        document.getElementById("updateButton").style.display = 'none';
        document.getElementById("addButton").style.display = 'block';
        document.getElementById("formData").reset();
    }
    else {
        loginData.style.display = 'block';
    }
});
var table = document.getElementById("table-body");
var i = 0, previousRow = -1, form, isFormValid;
var name1, email, mobile, landline, website, address;
// inserting new contact into book
document.getElementById("addButton").addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    form = document.getElementById("addForm");
    name1 = (document.getElementById("name").value);
    email = (document.getElementById("email").value);
    mobile = (document.getElementById("mobile").value);
    landline = (document.getElementById("landline").value);
    website = (document.getElementById("website").value);
    address = (document.getElementById("address").value);
    isFormValid = (validateFields(name1, email, mobile));
    if (isFormValid) {
        var contactobj = new contact(name1, email, mobile, landline, website, address);
        let data = yield service.addContact(contactobj);
        table.innerHTML = "";
        initial = false;
        yield getContacts();
        form.style.display = 'none';
    }
}));
var data = '';
//display card details
function display(id) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id + " in dispaly method");
        (_a = document.getElementById(`${previousId}`)) === null || _a === void 0 ? void 0 : _a.classList.remove("selectedRowBackground");
        (_b = document.getElementById(`${id}`)) === null || _b === void 0 ? void 0 : _b.classList.add("selectedRowBackground");
        //  previousId=id;
        yield obj.getContact(id).then(data => {
            data = data.value;
            temp = data;
            document.getElementById("cardName").innerHTML = data.name;
            document.getElementById("cardEmail").innerHTML = data.email;
            document.getElementById("cardMobile").innerHTML = data.phone;
            document.getElementById("cardLandline").innerHTML = data.landline;
            document.getElementById("cardWebsite").innerHTML = data.website;
            document.getElementById("cardAddress").innerHTML = data.address;
        });
        document.getElementById("card").style.display = 'block';
        formData.style.display = 'none';
        previousId = id;
    });
}
;
//deleting a contact  
document.getElementById("deleteButton").addEventListener('click', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const response = confirm("Do you want to delete contact!!");
        if (response) {
            yield service.deleteContact(id);
            table.innerHTML = "";
            getContacts();
            initial = true;
            document.getElementById('card').style.display = 'none';
        }
    });
});
//editing the contact
document.getElementById('editButton').addEventListener('click', function () {
    return __awaiter(this, void 0, void 0, function* () {
        // let data=await obj.getContact(id);
        //    console.log(data);
        let data = temp;
        console.log("temp in edit " + temp);
        console.log(data);
        document.getElementById("name").value = data.name;
        document.getElementById("email").value = data.email;
        document.getElementById("mobile").value = data.phone;
        document.getElementById("landline").value = data.landline;
        document.getElementById("website").value = data.website;
        document.getElementById("address").value = data.address;
        document.getElementById("updateButton").style.display = 'block';
        document.getElementById('addButton').style.display = 'none';
        document.getElementById('card').style.display = 'none';
        // formData.style.display='block';
        console.log(document.getElementById("name").value);
        formData.style.display = 'block';
        document.getElementById("cancel").addEventListener('click', () => {
            formData.style.display = 'none';
            document.getElementById("card").style.display = 'block';
            document.getElementById("formData").reset();
        });
    });
});
//update existing contact:
document.getElementById("updateButton").addEventListener('click', function () {
    return __awaiter(this, void 0, void 0, function* () {
        name1 = (document.getElementById("name").value);
        email = (document.getElementById("email").value);
        mobile = (document.getElementById("mobile").value);
        landline = (document.getElementById("landline").value);
        website = (document.getElementById("website").value);
        address = (document.getElementById("address").value);
        isFormValid = (validateFields(name1, email, mobile));
        if (isFormValid) {
            var contactobj = new contact(name1, email, mobile, landline, website, address);
            yield service.updateContact(id, contactobj);
            console.log("after update method");
            table.innerHTML = "";
            up = false;
            tempId = id;
            yield getContacts();
            id = tempId;
            yield display(id);
            up = true;
            console.log("update" + id);
            formData.style.display = 'none';
            document.getElementById("updateButton").style.display = 'none';
            document.getElementById("addButton").style.display = 'block';
            document.getElementById('card').style.display = 'block';
        }
    });
});
//validating the form:
var res = 1;
var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function validateFields(name, email, mobile) {
    res = 1;
    if (name1 == "" || email == '') {
        alert("fill form");
        res &= 0;
        console.log("ne" + res);
    }
    else if (!regex.test(email)) {
        // alert("please enter valid email")
        validateEmail();
        res &= 0;
    }
    else if (isNaN(mobile) || mobile.length != 10) {
        validateMobile();
        res &= 0;
    }
    return res;
}
var emailValue = document.getElementById("email");
var mobileValue = document.getElementById("mobile");
function validateEmail() {
    if (!regex.test(emailValue.value))
        document.getElementById("reqEmail").innerHTML = "not valid";
    else
        document.getElementById("reqEmail").innerHTML = "*";
}
function validateMobile() {
    if (!(mobileValue.value).length) {
        document.getElementById("reqMobile").innerHTML = "*";
    }
    if (isNaN(mobileValue.value) || ((mobileValue.value).length != 10))
        document.getElementById("reqMobile").innerHTML = "not valid";
    else
        document.getElementById("reqMobile").innerHTML = "*";
}
