var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchDataBase } from "./dataModel.js";
var obj = new fetchDataBase();
export class services {
    login(object) {
        return __awaiter(this, void 0, void 0, function* () {
            yield obj.postUserCredentialsIntoDb(object);
        });
    }
    addContact(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            yield obj.addContact(contact);
        });
    }
    getContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield obj.getContacts();
        });
    }
    updateContact(id, contactObj) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id + " update " + contactObj.Name);
            //return 
            yield obj.updateContact(id, contactObj);
        });
    }
    deleteContact(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield obj.deleteContact(id);
        });
    }
}
