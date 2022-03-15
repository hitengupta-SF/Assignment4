var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { User } from "./User.js";
import data from "./data.json" assert { type: "json" };
import headerData from "./headerMetaData.json" assert { type: "json" };
function FormatDate() {
    return function (target, name, descriptor) {
        const dateTime = document.getElementById("dateTime");
        dateTime.innerHTML = new Date().toLocaleString();
        setInterval(function () {
            dateTime.innerHTML = new Date().toLocaleString();
        }, 1000);
    };
}
export class Table {
    constructor() {
        this.users = [];
        this.col = [];
        this.tableContainer = document.createElement("table");
        this.tableContainer.classList.add("containertable");
        this.mainApp = document.querySelector(".app");
        this.mainApp.appendChild(this.tableContainer);
        this.initialize();
    }
    initialize() {
        for (let key in headerData) {
            if (this.col.indexOf(key) < 0) {
                this.col.push(key);
            }
        }
        data.forEach(ob => {
            this.users.push(new User(ob.id, ob.firstName, ob.middleName, ob.lastName, ob.email, ob.phoneNumber, ob.role, ob.address));
        });
    }
    create() {
        this.render();
    }
    render() {
        let tableEle = document.createElement("table");
        let tr = tableEle.insertRow(-1);
        headerData.forEach((item, index) => {
            let th = tr.insertCell(index);
            th.innerHTML = item.id;
        });
        data.forEach((item, index) => {
            let tr = tableEle.insertRow(-1);
            tr.setAttribute("id", `${index + 1}`);
            tr.classList.add("tr");
            tr.setAttribute("contenteditable", "false");
            headerData.forEach((key) => {
                let value = `${item[key.name]}`;
                let td = tr.insertCell(-1);
                td.innerHTML = value;
            });
            let editBtn = document.createElement("button");
            editBtn.innerHTML = "Edit";
            editBtn.addEventListener("click", (e) => this.update(e));
            editBtn.classList.add("edit");
            let deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Delete";
            deleteBtn.addEventListener("click", (e) => this.delete(e));
            deleteBtn.classList.add("dlt");
            let cancelBtn = document.createElement("button");
            cancelBtn.innerHTML = "Cancel";
            cancelBtn.addEventListener("click", (e) => this.cancel(e));
            cancelBtn.classList.add("cancel");
            cancelBtn.setAttribute("id", `cancelBtn${index + 1}`);
            tr.append(editBtn);
            tr.append(deleteBtn);
            tr.append(cancelBtn);
        });
        this.tableContainer.appendChild(tableEle);
    }
    read() { }
    update(e) {
        let targetBtn = e.target;
        let tr = targetBtn.parentElement;
        let trId = tr.id;
        let cancelBtn = document.getElementById(`cancelBtn${trId}`);
        if (targetBtn.innerHTML === "Edit") {
            tr.contentEditable = "true";
            targetBtn.innerHTML = "Save";
            cancelBtn.style.display = "block";
            cancelBtn.contentEditable = "false";
            targetBtn.contentEditable = "false";
        }
        else {
            tr.contentEditable = "false";
            targetBtn.innerHTML = "Edit";
            cancelBtn.style.display = "none";
        }
    }
    delete(e) {
        let targetBtn = e.target;
        targetBtn.contentEditable = "false";
        let tr = targetBtn.parentElement;
        tr.remove();
    }
    cancel(e) {
        let targetBtn = e.target;
        let parentTr = targetBtn.parentElement;
        let trId = parentTr.id;
        console.log(trId);
        this.refresh();
    }
    refresh() {
        location.reload();
    }
}
__decorate([
    FormatDate()
], Table.prototype, "render", null);
