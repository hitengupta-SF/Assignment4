import { Table } from "./table.js";

class MainPage {
    appDiv:HTMLDivElement;
  loadBtn: HTMLButtonElement;
  table: Table;
  constructor() {
    this.appDiv = document.querySelector(".app")!;
    this.loadBtn = document.createElement("button");
    this.loadBtn.innerHTML = "LOAD DATA";
    this.loadBtn.classList.add("btn");
    this.appDiv.append(this.loadBtn);
    this.table = new Table();
    this.loadBtn.addEventListener("click", () => this.load());
  }

  load() {
    if (this.loadBtn.innerHTML == "LOAD DATA") {
     this.table.create();
      this.loadBtn.innerHTML = "Refresh";
    } else {
      this.table.refresh();
    }
  }
}

new MainPage();
