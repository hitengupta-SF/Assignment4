import data from "./data.json" assert { type: "json" };
import headerData from "./headerMetaData.json" assert { type: "json" };
export class UserCRUD {
    constructor() {
        this.tableContainer = document.createElement("table");
        this.tableContainer.classList.add("containertable");
        this.mainApp = document.querySelector(".app");
        this.mainApp.appendChild(this.tableContainer);
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
            tr.classList.add("tr");
            tr.setAttribute("contenteditable", "false");
            headerData.forEach((key) => {
                const value = item[key.name];
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
        let cancelBtn = document.querySelector(".cancel");
        if (targetBtn.innerHTML === "Edit") {
            tr.contentEditable = "true";
            targetBtn.innerHTML = "Save";
            cancelBtn.style.display = "block";
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
        this.refresh();
    }
    refresh() {
        location.reload();
    }
}
