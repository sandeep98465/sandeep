var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var token;
export class fetchDataBase {
    postUserCredentialsIntoDb(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(obj);
            let postApi = yield fetch("https://localhost:7257/api/Login", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json"
                }
            });
            yield postApi.json().then(data => {
                token = data.token;
                //   return token;
                console.log(token);
            });
        });
    }
    getContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("another " + token);
            let aa = yield fetch("https://localhost:7257/api/AddressBook", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then((data) => data.json());
            return aa;
        });
    }
    addContact(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("In fetch " + obj);
            let postApi = yield fetch("https://localhost:7257/api/AddressBook", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json"
                }
            });
            console.log(postApi);
        });
    }
    // var data1=''
    getContact(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("fetching displayCOnaatctDetails");
            let data1 = yield fetch(`https://localhost:7257/api/AddressBook/${id}`).then((data) => data.json()
            //  ).then(data=>console.log(data.value.name)
            ).catch(err => console.log(err));
            // console.log(data1.value.name);
            return data1;
        });
    }
    updateContact(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("update in data class " + obj);
            let update = yield fetch(`https://localhost:7257/api/AddressBook/${id}`, {
                method: "PUT",
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json"
                }
            }).then((data) => data.json()).then(data => console.log(data)).catch((err) => console.log(err));
        });
    }
    deleteContact(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let del = yield fetch(`https://localhost:7257/api/AddressBook/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                body: null
            }).catch(err => console.log(err));
        });
    }
}
